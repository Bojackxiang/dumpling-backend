import { UserExistedError } from "../../../errors/UserExistedError";
import { User } from "../../../Models";

interface ISignUp {
  email: string;
  password: string;
  nick_name: string;
  phone: string;
}
const signUp = async (inputs: ISignUp) => {
  try {
    const userExisted = await User.findExistingUser({email: inputs.email})

    if(Boolean(userExisted)){
      throw new UserExistedError();
    }

    const user = User.build({
      email: inputs.email,
      password: inputs.password, // TODO: 将密码加密
      nick_name: inputs.nick_name,
      phone: inputs.phone,
    });

    // Save user
    await user.save();
  } catch (error) {
    throw error
  }
};

export default signUp;
