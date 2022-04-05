import messageObject from "../../../common/messageObject"
import { User } from "../../../Models"
import ServiceResult from "../../serviceResult"


interface UserInfoInput {
  email: string
  password: string
}

const login = async (input: UserInfoInput) => {
  const foundUser = await User.findOne({ email: input.email })
  // case 1: user email is not found 
  if (!foundUser) {
    return new ServiceResult(
      messageObject.ERROR_USER_NOT_FOUND.code,
      messageObject.ERROR_USER_NOT_FOUND.message,
    )
  }

  // case 2: user password is not correct 
  if (foundUser.password !== input.password) {
    return new ServiceResult(
      messageObject.ERROR_USER_PASSWORD_NOT_CORRECT.code,
      messageObject.ERROR_USER_PASSWORD_NOT_CORRECT.message,
    )
  }


  return new ServiceResult();


}

export default login;