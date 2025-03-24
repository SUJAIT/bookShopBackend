import { status } from 'http-status';
import { Request, Response } from 'express';
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { OrderService } from "./order.service";


const buyProduct = catchAsync(async (req: Request, res: Response) =>{
    const {userId, productId,quantity} = req.body;
    console.log(req.body)
    try{
        const order = await OrderService.OrderProduct(userId,productId,quantity);

        sendResponse(res, {
            statusCode:status.OK,
            success:true,
            message: "Product Purchased Successfully",
            data:order
        })
    }catch(error) {
        sendResponse(res, {
            statusCode: status.INTERNAL_SERVER_ERROR,
            success:false,
            message:`Order failed : ${(error as Error).message}`,
            data:null
        })
    }
})

export const OrderController = {
    buyProduct
};