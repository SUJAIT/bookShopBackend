import status from "http-status";
import catchAsync from "../../../utils/catchAsync"
import sendResponse from "../../../utils/sendResponse";
import { UserServices } from "./user.services";

// ++++createUser
const createUser = catchAsync(async (req, res) => {
    const { password, ...userData } = req.body;

    const result = await UserServices.createUser(
        // req.file, 
        password,
        userData
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


export const userController = {
    createUser
}
