import { User } from "../../../Models";

interface ISignUp {
  email: string;
  password: string;
  nick_name: string;
  phone: string;
}
const signUp = async (inputs: ISignUp) => {
  try {
    // TODO: check existing user

    // create user
    const user = User.build({
      email: inputs.email,
      password: inputs.password, // TODO: 将密码加密
      nick_name: inputs.nick_name,
      phone: inputs.phone,

    });

    // Save user
    await user.save();
  } catch (error) {
    console.log(error);
  }
};

export default signUp;
