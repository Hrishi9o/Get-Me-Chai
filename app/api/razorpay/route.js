import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import User from "@/models/User";

export const POST = async (req) => {
    await connectDB()
    // 2. Razorpay sends the callback as multipart/form-data or url-encoded form data.
    // req.formData() reads this data stream from the request.
    let body = await req.formData()

    // Convert FormData entries (key-value pairs) into a standard JavaScript object
    // e.g., { razorpay_order_id: "...", razorpay_payment_id: "...", razorpay_signature: "..." }
    body = Object.fromEntries(body)

    //Check if this order exists in our database (it was created earlier during initiate())
    let p = await Payment.findOne({ oid: body.razorpay_order_id })
    if (!p) {
        return NextResponse.json({ success: false, message: "OrderID not found" });
    }

    //fetching secret key of the user who is getting the payment
    const user = await User.findOne({ username: p.to_user })
    const secret = user.razorpaysecret

    //Verify payment 
    let xx = validatePaymentVerification({
        "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id
    },
        body.razorpay_signature, secret)

    if (xx) {
        const updatedpayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: 'true' }, { new: 'true' }/*returns the updated document*/)
        //above code updates and returns teh row which we store in updatedpayment
        //we use to_user key from payment schema 


        // Redirect the user back to the profile page of the creator they supported (303 forces GET request)
        const origin = req.nextUrl?.origin || process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
        return NextResponse.redirect(`${origin}/${updatedpayment.to_user}?paymentdone=true`, 303)
    }
    else {
        // If verification fails (tampered payload or invalid signature)
        return NextResponse.json({ success: false, message: "Payment verification failed" });
    }

}