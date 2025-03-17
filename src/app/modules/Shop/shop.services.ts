/* eslint-disable @typescript-eslint/no-explicit-any */
import { Shop } from "./shop.model";


const createShop = async (payload: any) => {
    const result = await Shop.create(payload);
    return result;
}

export const ShopService = {
    createShop
}