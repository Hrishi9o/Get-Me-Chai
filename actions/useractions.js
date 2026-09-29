"use server"
import Razorpay from "razorpay"
import User from "@/models/User"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDb"


export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()
    if (!paymentform?.name || !amount) {
        throw new Error("Name and Amount are required to initiate payment.")
    }
    const user = await User.findOne({ username: to_username })
    const keyid = user.razorpayid
    const keysecret = user.razorpaysecret
    const instance = new Razorpay({ key_id: keyid, key_secret: keysecret });

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR"
    }
    let x = await instance.orders.create(options)

    // create a payment object which shows a pending payment in the database 
    await Payment.create({ oid: x.id, amount: amount, to_user: to_username, name: paymentform.name, message: paymentform.message })
    //the above method both ceates and save sthe data in teh database
    /* 
    or
    The below method needs explicit save

    // 1. Instantiate the document in local memory
    const payment = new Payment({
    oid: x.id,
    amount: amount,
    to_username: to_username,
    name: payementform.name, 
    message: payementform.message
    });

    // 2. Explicitly trigger the database write
    await payment.save(); */

    return x;
}

export const fetchuser = async (username) => {
    await connectDB()
    let u = await User.findOne({ username: username }).lean()
    if (!u) return null
    return JSON.parse(JSON.stringify(u))
}

export const fetchpayment = async (username) => {
    await connectDB()
    // Find all successful payments for this user: highest amount first, then newest first for ties
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1, createdAt: -1 }).lean()
    return JSON.parse(JSON.stringify(p))
}

export const fetchUserStats = async (username) => {
    await connectDB()
    const allPayments = await Payment.find({ to_user: username, done: true }).sort({ createdAt: -1 }).lean()

    const totalAmountPaise = allPayments.reduce((acc, p) => acc + (p.amount || 0), 0)
    const totalEarnings = totalAmountPaise / 100
    const totalPayments = allPayments.length

    // Unique supporters by name
    const uniqueSupporters = new Set(allPayments.map(p => p.name ? p.name.trim().toLowerCase() : "anonymous")).size

    // Average contribution
    const avgDonation = totalPayments > 0 ? Math.round(totalEarnings / totalPayments) : 0

    // Top supporter: highest amount first, then newest first for ties (identical to fetchpayment)
    const sortedByAmount = [...allPayments].sort((a, b) => {
        if (b.amount !== a.amount) {
            return b.amount - a.amount
        }
        return new Date(b.createdAt) - new Date(a.createdAt)
    })
    const topPayment = sortedByAmount.length > 0 ? sortedByAmount[0] : null

    return {
        totalEarnings,
        totalPayments,
        uniqueSupporters,
        avgDonation,
        topSupporter: topPayment ? { name: topPayment.name, amount: topPayment.amount / 100 } : null,
        recentPayments: JSON.parse(JSON.stringify(allPayments))
    }
}


export const updateProfile = async (data, oldusername) => {
    await connectDB()
    let ndata = Object.fromEntries(data)

    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }
        //if username is changed then change tye uername in Paymet databse as well 
        await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username })
    }
    await User.updateOne({ email: ndata.email }, ndata)
    // Find the user in the database whose email matches ndata.email, and update their document with the new values provided in ndata.
}

export const fetchCreators = async () => {
    await connectDB()
    const users = await User.find(
        { username: { $exists: true, $ne: "" } },
        { name: 1, username: 1, profilepic: 1, coverpic: 1, _id: 0 }
    ).lean()

    const creatorStats = await Payment.aggregate([
        { $match: { done: true } },
        { $group: { _id: "$to_user", totalSupporters: { $sum: 1 }, totalPaise: { $sum: "$amount" } } }
    ])

    const statsMap = {}
    creatorStats.forEach(c => {
        if (c._id) {
            statsMap[c._id] = {
                supporters: c.totalSupporters,
                raised: c.totalPaise / 100
            }
        }
    })

    const enriched = users.map(u => ({
        ...u,
        supporters: statsMap[u.username]?.supporters || 0,
        raised: statsMap[u.username]?.raised || 0
    }))

    enriched.sort((a, b) => b.supporters - a.supporters)

    return JSON.parse(JSON.stringify(enriched))
}
