/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import { IShop } from './shop.interface';


const ShopSchema: Schema = new Schema<IShop>({
    name: {
        type: String,
        required: true,
    },
  
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    // products:[{type: mongoose.Schema.Types.ObjectId,ref:"Product"}],
    rating: { type: Number, default: 0 }, // রেটিং ডিফল্ট 0
    reviews: [
      {
        user: { type: String, required: true }, // ইউজারের নাম বা আইডি
        comment: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 }, // 1 থেকে 5-এর মধ্যে রেটিং
      },
    ],
})


//Rating functions ++++
ShopSchema.methods.calculateRating = async function () {
   //চেক করা হচ্ছে, শপের কোনো রিভিউ আছে কিনা 
    if (this.reviews.length === 0) {
        this.rating = 0;
    } else {
        //গড় রেটিং হিসাব করা
        const total = this.reviews.reduce((acc: number, review: { rating: number }) => acc + review.rating, 0);
        //মোট রেটিং (total) কে রিভিউ সংখ্যা দিয়ে ভাগ করা হচ্ছে, যাতে গড় রেটিং পাওয়া যায়।
        this.rating = total / this.review.length;
    }
   //আপডেটেড রেটিং সংরক্ষণ করা হচ্ছে
    await this.save()
}
//Rating functions ----
//Add or Updating Function ++++
ShopSchema.methods.addOrUpdateReview = async function (userId: string, comment: string, rating: number){
    const existingReviewIndex = this.reviews.findIndex((review : any) => review.user === userId);

    if(existingReviewIndex !== -1) {
        //Update Review
        this.reviews[existingReviewIndex].comment=comment;
        this.reviews[existingReviewIndex].rating=rating;
    } else {
        //add new review
        this.reviews.push({user: userId,comment,rating})
    }
    await this.calculateRating()
}
//Add or Updating Function ----






export const Shop = mongoose.model<IShop>("Shop",ShopSchema)