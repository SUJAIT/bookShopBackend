
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";

import sendResponse from "../../../utils/sendResponse";
import status from "http-status";
import { PaymentService } from "./payment.service";


const createPaymentIntent = catchAsync(async (req: Request, res: Response) =>{
    const {userId, orderId} =  req.body;
    const clientSecret = await PaymentService.createPaymentIntent(userId,orderId);

    sendResponse(res,{
        statusCode: status.OK,
        success: true,
        message: "Payment Intent Created Successfully",
        data: {clientSecret}
    });

});

const confirmPayment = catchAsync(async (req:Request,res: Response) =>{
  const {paymentIntentId} = req.body;
  const order = await PaymentService.confirmPayment(paymentIntentId);
  
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message:"payment confirmed successfully",
    data: order
  });
});


export const PaymentController = {
    createPaymentIntent,
    confirmPayment
}