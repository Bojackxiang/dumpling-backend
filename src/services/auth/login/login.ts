import ServiceResult from "../serviceResult"


interface  UserInfoInput {
  username: string
  password: string
}

const login = (input: UserInfoInput) => {
  return new ServiceResult<any>(200, "failure", false, {})
  // return {
  //   username: input.username,
  // }
}

export default login;