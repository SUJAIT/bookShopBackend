
import mongoose, { Document } from "mongoose";


export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;
    quantity: number;
    totalPrice : number;
    status: "pending" | "completed" | "canceled",
    paymentStatus: "pending" | "paid" | "failed";
    paymentIntentId?: string;
    createdAt: Date;
    updatedAt: Date;
}
