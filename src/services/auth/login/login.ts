import messageObject from '../../../common/messageObject';
import config from '../../../appConfig';
import { foundUserDTO } from '../../../DTO';
import { User } from '../../../Models';
import JWTUtils from '../../../utils/jwtUtils';
import { Password } from '../../../utils/password';
import ServiceResult from '../../serviceResult';

interface UserInfoInput {
  email: string;
  password: string;
}

const login = async (input: UserInfoInput) => {
  const foundUser = await User.findOne({ email: input.email });
  // case 1: user email is not found
  if (!foundUser) {
    return new ServiceResult(
      messageObject.ERROR_USER_NOT_FOUND.code,
      messageObject.ERROR_USER_NOT_FOUND.message,
      false
    );
  }

  // case 2: user password is not correct
  const compareResult = await Password.compare(
    foundUser.password,
    input.password
  );
  if (!compareResult) {
    return new ServiceResult(
      messageObject.ERROR_USER_PASSWORD_NOT_CORRECT.code,
      messageObject.ERROR_USER_PASSWORD_NOT_CORRECT.message,
      false
    );
  }

  const jwtToken = JWTUtils.generateJWT(foundUserDTO(foundUser), config.salt);
  return new ServiceResult(0, '', true, {
    ...foundUserDTO(foundUser),
    token: jwtToken,
  });
};

export default login;
