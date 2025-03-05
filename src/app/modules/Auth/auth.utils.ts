import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

//New Token Created...
export const createToken = (
    jwtPayload: { email: string, role: string },
    secret: jwt.Secret,
    expiresIn: SignOptions['expiresIn'],
) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn,
    });
};

//token verify / checking ....
export const verifyToken = (token:string,secret:string) =>{
    return jwt.verify(token,secret) as JwtPayload
}