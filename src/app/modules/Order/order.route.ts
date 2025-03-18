import express from "express";
import { OrderController } from './order.controller';

const router = express.Router();

router.post("/buy",OrderController.buyProduct);

export const OrderRoutes = router;