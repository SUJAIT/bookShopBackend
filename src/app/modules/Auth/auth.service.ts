

import status from "http-status"
import AppError from "../../../errors/AppError"
import { User } from "../user/user.model"
import { TLoginUser } from "./auth.interface"
import config from "../../config"
import { createToken } from "./auth.utils"

// ++++loginUser
const loginUser = async (payload:TLoginUser)=>{

const user = await User.findOne({email:payload.email})
  console.log(user)
  // ++checking user
  if (!user){
    throw new AppError(status.NOT_FOUND, 'Oops Not Found This User !')
  }
  // --checking user
  //++blockChecking
  const userStatus = user?.status
if (userStatus === 'blocked'){
  throw new AppError(status.FORBIDDEN, "This User Blocked !");
}
  //--blockChecking
//++token-create-send-client-site
//token send obj and this obj data
const jwtPayload = {
  email: user.email,
  role: user.role
}
// create accessToken Method
const accessToken = createToken(
  jwtPayload,
  config.jwt_access_secret as string,
  parseInt(config.jwt_access_expires_in as string, 10)
)
//create refreshToken Method
const refreshToken = createToken(
  jwtPayload,
  config.jwt_refresh_secret as string,
  parseInt(config.jwt_refresh_expires_in as string, 10),
);

return {
  accessToken,
  refreshToken
}

//--token

}
// ----loginUser




export const AuthServices = {
    loginUser
}