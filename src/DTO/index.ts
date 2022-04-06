import { UserAttrs } from "../Models/User";

export const foundUserDTO = (user: UserAttrs) => {
  return {
    email: user.email,
    phone: user.phone,
    role: user.role
  }
}