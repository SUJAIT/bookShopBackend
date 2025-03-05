/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TAdminUser } from './admin.interface';
import bcrypt from 'bcrypt';
import config from '../../config';


const AdminSchema = new Schema<TAdminUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: 0, //ati use na korla data jason data ta return hoba ja secured na...
        },
        role: {
            type: String,
            enum: ['admin']
        },
    },
    // ++++
    {
        timestamps: true,
    },
    // ----
)

AdminSchema.pre('save', async function (next) {
    const admin = this;

    admin.password = await bcrypt.hash(
        admin.password,
        Number(config.bcrypt_salt_rounds)
    )
    next()
})

//The user's password field is being cleared after saving to the database.
// ++++
AdminSchema.post('save',function (doc,next) {
    doc.password = '';
    next()
})
// ----
// এই Mongoose Static Method-টি ইউজারের ইনপুট দেওয়া পাসওয়ার্ড (plain text) এবং ডাটাবেজে সংরক্ষিত হ্যাশ করা পাসওয়ার্ড মিলিয়ে দেখে।
// ++++
AdminSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
){
    return await bcrypt.compare(plainTextPassword,hashedPassword)
};

// ++++
// ----userSchema.statics → এটি Mongoose-এর Static Method তৈরি করে।
// ----isJWTIssuedBeforePasswordChanged → এটি JWT টোকেন ইস্যু হওয়ার আগে ইউজার পাসওয়ার্ড পরিবর্তন করেছে কিনা তা যাচাই করার জন্য একটি ফাংশন।
// ---- passwordChangedTimestamp → এটি ইউজারের শেষবার পাসওয়ার্ড পরিবর্তন করার সময় (Date ফরম্যাটে)।
// ---- jwtIssuedTimestamp → এটি JWT টোকেন যে সময়ে ইস্যু হয়েছিল (Unix Timestamp ফরম্যাটে)।
AdminSchema.statics.isJWTIssuedBeforePasswordChanged = function(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
) {
    const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp
}
// ----



export const Admin = model<TAdminUser>('Admin', AdminSchema)