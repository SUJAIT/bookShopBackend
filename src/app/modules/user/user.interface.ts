



export interface  IUser {
    userName: string,
    email:string,
    password: string,
    role:"admin" | "client",
    status:'in-progress' | 'blocked',
}

