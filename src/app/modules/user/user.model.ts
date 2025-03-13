/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from './user.interface';
import config from '../../config';
import { UserStatus } from './user.constant';



const UserSchema = new Schema<IUser>({

    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["admin" , "client"],
        default:"client"
    },
    status: {
        type: String,
        enum: UserStatus,
        default: 'in-progress'
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },

},
    // ++++
    {
        timestamps: true,
    }
    // ----
)


// ++++
// hasing method create for password ...
UserSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
})
// ----
// ++++
// After Set Password doc file clear this method use ...
// এটি ইউজার ডাটাবেজে সংরক্ষণ (save) হওয়ার পর পাসওয়ার্ড ফাঁকা করে দেয়।
// এর ফলে যখন ইউজারের তথ্য পাওয়া যাবে, তখন password field থাকবে, কিন্তু এর মান থাকবে ফাঁকা।
// নিরাপত্তার জন্য পাসওয়ার্ড ফাঁকা করা হয়, যাতে এটি রেসপন্সে প্রকাশ না হয়।
UserSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

// ----

// ++++

UserSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashPassword)
}

// ----

// ++++
UserSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
) {
    const passwordChangedTime =
        new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};
// ----

export const User = model<IUser>('User', UserSchema);