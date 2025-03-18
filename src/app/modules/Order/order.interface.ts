
import mongoose, { Document } from "mongoose";


export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId
    quantity: number;
    totalPrice : number;
    status: "pending" | "completed" | "canceled"
    createdAt: Date;
    updatedAt: Date;
}
