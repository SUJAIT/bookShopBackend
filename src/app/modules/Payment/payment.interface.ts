

export interface IPayment {
    _id: string;
    user: string;
    order: string;
    amount: number;
    currency: string;
    status: "pending" | "completed" | "cancelled";
    paymentStatus: "pending" | "paid" | "failed"; // Added paymentStatus field
    transactionId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPaymentRequest {
    userId: string;
    orderId: string;
}


export interface IPaymentResponse {
    success: boolean;
    message: string;
    clientSecret?: string; // Used for Stripe payment
}
