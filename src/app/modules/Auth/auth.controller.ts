import status from "http-status";
import catchAsync from "../../../utils/catchAsync"
import sendResponse from "../../../utils/sendResponse";
import config from "../../config";
import { AuthServices } from "./auth.service"

// ++++login
const loginUser = catchAsync(async (req, res) =>{
const result = await AuthServices.loginUser(req.body);
const {refreshToken, accessToken} = result;

res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
});

sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User is login successfully!',
    data: {
      accessToken,
    },
  });


})
// ----login

export const AuthControllers = {
    loginUser
}