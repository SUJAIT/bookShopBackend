import mongoose from "mongoose";
import { IUser } from "./user.interface"
import { User } from "./user.model";

// ++++client
// this createUser uses transaction roll-back
const createClientUser = async (
    // file: any, img patanur time a lagba
    password: string,
    payload: IUser
) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // create a user object<
        const clientUserData: IUser = {
            userName: payload.userName,
            email: payload.email,
            password: password,
            role: "client",  
            status: "in-progress", 
            
        };
        // svae user 
        const clientNewUser = new User(clientUserData);
        await clientNewUser.save({ session });

        // commit transaction 
        await session.commitTransaction();
        session.endSession();
        return { message: "User Registered Success fully", user: clientNewUser };
    } catch (error) {
        await session.abortTransaction(); // Rollback transaction if an error occurs
        session.endSession();
        throw error;
    }
    //try-end
}
// ----client

// ++++admin
const createAdminUser = async (
    // file: any, img patanur time a lagba
    password: string,
    payload: IUser
) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // create a user object<
        const adminData: IUser = {
            userName: payload.userName,
            email: payload.email,
            password: password,
            role: "admin",  
            status: "in-progress", 
            
        };
        // svae user 
        const newAdminUser = new User(adminData);
        await newAdminUser.save({ session });

        // commit transaction 
        await session.commitTransaction();
        session.endSession();
        return { message: "User Registered Success fully", user: newAdminUser };
    } catch (error) {
        await session.abortTransaction(); // Rollback transaction if an error occurs
        session.endSession();
        throw error;
    }
    //try-end
}
// ----admin

export const UserServices = {
    createClientUser,
    createAdminUser
}