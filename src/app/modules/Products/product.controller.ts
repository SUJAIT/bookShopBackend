import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ProductService } from "./product.service";
import status from "http-status";

const createProduct = catchAsync(async (req, res) => {
try{
    const result = await ProductService.createProduct(req.body);
    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: "Product Created Successfully",
        data: result
    })
} catch (error) {
    sendResponse(res, {
        statusCode: status.BAD_REQUEST,
        success: false,
        message: (error as Error).message || "Failed to create Product",
        data: null,
    })
}
});



export const ProductController = {
    createProduct
}