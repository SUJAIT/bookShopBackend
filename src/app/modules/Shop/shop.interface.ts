import mongoose, { Document } from "mongoose";


export interface IShop extends Document {
    name: string;
    email: string;
    phone: string;
    rating: number; 
    products: mongoose.Schema.Types.ObjectId[]
    reviews: { user: string; comment: string; rating: number }[];
}