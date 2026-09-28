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
    const user =await User.findOne({username:to_username})
    const keyid=user.razorpayid
    const keysecret=user.razorpaysecret
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
    // Find payments for this user, sorted by decreasing order of amount
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean()
    return JSON.parse(JSON.stringify(p))
}


export const updateProfile = async (data, oldusername) => {
    await connectDB()
    let ndata = Object.fromEntries(data)

    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if(u) {
            return { error: "Username already exists" }
        }
        //if username is changed then change tye uername in Paymet databse as well 
        await Payment.updateMany({to_user:oldusername},{to_user:ndata.username})
    }
    await User.updateOne({ email: ndata.email }, ndata)
    // Find the user in the database whose email matches ndata.email, and update their document with the new values provided in ndata.
}
