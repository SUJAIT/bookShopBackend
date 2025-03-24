import mongoose, { Schema } from "mongoose";
import { IOrder } from "./order.interface";


const OrderSchema = new Schema<IOrder>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        totalPrice: {
            type:Number,
            required: true
        },
        status: {
            type:String,
            enum: ["pending","completed","canceled"],
            default: "pending"
        },
        paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
        paymentIntentId: { type: String }
    },
{timestamps: true}
)

export const Order = mongoose.model<IOrder>("Order",OrderSchema);
