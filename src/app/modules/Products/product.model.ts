import mongoose, { Schema } from "mongoose";
import { IProducts } from "./product.interface";


const ProductSchema = new Schema<IProducts>({
    name: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required:true
    },
    stock: {
        type:Number,
        required: true,
        default: 0
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required:true
    }

},
{ timestamps: true }
);

export const Product = mongoose.model<IProducts>("Product",ProductSchema)