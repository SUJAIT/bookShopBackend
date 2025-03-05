import mongoose from "mongoose";
import { IUser } from "./user.interface"
import { User } from "./user.model";

// ++++
// this createUser uses transaction roll-back
const createUser = async (
    // file: any, img patanur time a lagba
    password: string,
    payload: IUser
) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // create a user object<
        const userData: IUser = {
            userName: payload.userName,
            email: payload.email,
            password: password,
        };
        // svae user 
        const newUser = new User(userData);
        await newUser.save({ session });

        // commit transaction 
        await session.commitTransaction();
        session.endSession();
        return { message: "User Registered Success fully", user: newUser };
    } catch (error) {
        await session.abortTransaction(); // Rollback transaction if an error occurs
        session.endSession();
        throw error;
    }
    //try-end
}
// ----

export const UserServices = {
    createUser
}