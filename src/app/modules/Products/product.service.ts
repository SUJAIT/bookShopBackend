


/* eslint-disable @typescript-eslint/no-explicit-any */
import { Shop } from "../Shop/shop.model";
import { Product } from "./product.model"


const createProduct = async (payload: any) => {
    //Shop Exist or nOt 
    const shopExists = await Shop.findById(payload.shop);
    console.log(shopExists)
    if (!shopExists) {
        throw new Error("Invalid Shop Id")
    }

    const product = await Product.create(payload);

    const populatedProduct = await Product.findById(product._id).populate("shop")

    return populatedProduct;

};


export const ProductService = {
    createProduct
}