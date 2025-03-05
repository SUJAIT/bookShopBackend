/* eslint-disable no-unused-vars */
export type TNormalUserLogin = { 
    email:string;
    password: string;
}


export type TRegisterNormalUser = {
    email:string;
    userName:string;
    password:string;
}


export enum UserRole {
    ADMIN = "admin",
    BUYER = "buyer",
}


export interface IUser {
    username: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
  }