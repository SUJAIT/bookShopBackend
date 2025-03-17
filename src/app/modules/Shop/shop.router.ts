import express from 'express';
import { ShopController } from './shop.controller';


const router = express.Router()

router.post(
    '/create-shop',ShopController.createShop
)

export const ShopRouter = router;