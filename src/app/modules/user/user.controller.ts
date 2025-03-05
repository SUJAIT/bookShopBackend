import status from "http-status";
import catchAsync from "../../../utils/catchAsync"
import sendResponse from "../../../utils/sendResponse";
import { UserServices } from "./user.services";

// ++++createUser
const createUser = catchAsync(async (req, res) => {
    const { password, ...clientData } = req.body;

    const result = await UserServices.createClientUser(
        // req.file, 
        password,
        clientData
    );
    // ----result
    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: "User created successfully",
        data: result,
    });
    // ----sendResponse
})
// ---- createUSer

// ++++createAdminUser
const createAdminUser = catchAsync(async (req, res) => {
    const { password, ...clientData } = req.body;

    const result = await UserServices.createAdminUser(
        // req.file, 
        password,
        clientData
    );
    // ----result
    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: "User created successfully",
        data: result,
    });
    // ----sendResponse
})
// ---- createAdminUser


export const userController = {
    createUser,
    createAdminUser
}
