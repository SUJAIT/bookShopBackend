import mongoose, { Document } from "mongoose"

export interface IProducts extends Document {
    name : string;
    price : number;
    description: string;
    category: string;
    stock: number;
    shop: mongoose.Schema.Types.ObjectId // কোন শপে এই প্রোডাক্ট রয়েছে
}