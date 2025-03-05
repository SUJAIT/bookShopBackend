import { NextFunction, Request, RequestHandler, Response } from "express";

// Express-এর async route handlers সাধারণত try-catch ব্যবহার করে এরর হ্যান্ডেল করতে হয়।
//  catchAsync এই কাজটি স্বয়ংক্রিয়ভাবে করে এবং এরর ধরলে Express-এর next() ফাংশনে পাঠিয়ে দেয়।

const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        //Promise.resolve() দিয়ে এরর ক্যাচ করা
        //যদি fn ফাংশন কোনো এরর দেয়, তাহলে সেটি ক্যাচ (catch) করা হয়।
        // Express এর next(err) ফাংশনে পাঠানো হয়, যা এরর হ্যান্ডলিং মিডলওয়্যার দ্বারা পরিচালিত হয়।
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
};

export default catchAsync;