

import { Order } from "../Order/order.model";
import mongoose from "mongoose";
import { Product } from '../Products/product.model';
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.stripe_secret_key || '', {
    apiVersion: '2025-02-24.acacia',
});


// create-payment-intent ++++
const createPaymentIntent = async (userId: string, orderId: string) =>{
    const order = await Order.findById(orderId).populate("product");
    if(!order) {
        throw new Error("Order Not Found");
    }

    //create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: order.totalPrice * 100,
        currency: "usd",
        metadata: {orderId, userId}
    });

    //save payment intent ID in The order
    order.paymentIntentId = paymentIntent.id;
    await order.save();

    return paymentIntent.client_secret; // send this to frontend

};
// create-payment-intent ----

// confirmPayment ++++
const confirmPayment = async (paymentIntentId: string) => {
    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const order = await Order.findOne({ paymentIntentId }).session(session);
        if (!order) {
            throw new Error("Order not found");
        }

        // Check payment status from Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status === "succeeded") {
            // Mark order as paid
            order.paymentStatus = "paid";
            order.status = "completed";
            await order.save({ session });

            // Reduce stock
            const product = await Product.findById(order.product).session(session);
            if (product) {
                product.stock -= order.quantity;
                await product.save({ session });
            }

            // Commit transaction
            await session.commitTransaction();
        } else {
            throw new Error("Payment failed");
        }

        session.endSession();
        return order;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

// confirmPayment ----

export const PaymentService = {
    createPaymentIntent,
    confirmPayment
};