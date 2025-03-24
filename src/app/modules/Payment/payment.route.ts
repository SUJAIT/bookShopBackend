import express from "express";
import { PaymentController } from "./payment.controller";
const router = express.Router();

router.post("/create-payment-intent", PaymentController.createPaymentIntent);
router.post("/create-confirm", PaymentController.confirmPayment);

export const PaymentRoutes = router;

