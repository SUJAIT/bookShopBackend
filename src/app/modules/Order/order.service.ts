import mongoose from "mongoose";
import { Product } from "../Products/product.model";
import { User } from "../user/user.model"
import { Order } from "./order.model";


const OrderProduct = async (userId: string, productId: string, quantity: number) => {

    // Start Transaction-roll-back

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.findById(userId).session(session);
        
        // if user exists
        if (!user) {
            throw new Error("User Not found");
        }

        // check product exists
        const product = await Product.findById(productId).session(session);
        if (!product) {
            throw new Error("Product Not Found")
        }
        //Check Stock 
        if (product.stock < quantity) {
            throw new Error("Not enough Stock Available")
        }
        //Calculate Total price
        const totalPrice = product.price * quantity;

        // create new order 
        const order = await Order.create([{
            user: userId,
            product: productId,
            quantity,
            totalPrice,
            status: "pending"
        }], { session });

        // Update the stock of the product
        product.stock -= quantity;
        await product.save({ session });

        // every transaction is successful
        await session.commitTransaction();

       
        //end session of transaction
        session.endSession()
 // ✅ Populate user details (name, email)
        const populateOrderDetails = await Order.findById(order[0]._id).populate("user","userName email")


        return populateOrderDetails;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }

}

export const OrderService = {
    OrderProduct
}