import status from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ShopService } from "./shop.services";


const createShop = catchAsync(async(req,res) =>{
    const result = await ShopService.createShop(req.body);

    sendResponse(res,{
        statusCode: status.OK,
        success:true,
        message:'Shop Created Succesfully',
        data:result,
    });
});

export const  ShopController = {
    createShop
}