import { ResponseJsonDTO } from 'src/base/dtos/response-json.dto';

import { LoginPayloadDTO } from 'src/auth/dtos/login-payload.dto';
import { StoreUserDTO } from 'src/user/dtos/store-user.dto';
import { SendConfirmationCodePayloadDTO } from 'src/auth/dtos/send-confirmation-code-payload.dto';
import { ChangePasswordPayloadDTO } from 'src/auth/dtos/change-password-payload.dto';

export interface IAuthController {
  login(loginPayloadDTO: LoginPayloadDTO): Promise<ResponseJsonDTO>;
  register(storeUserDTO: StoreUserDTO): Promise<ResponseJsonDTO>;
  sendConfirmationCode(
    sendConfirmationCodePayloadDTO: SendConfirmationCodePayloadDTO,
  ): Promise<ResponseJsonDTO>;
  changePassword(
    changePasswordPayloadDTO: ChangePasswordPayloadDTO,
  ): Promise<ResponseJsonDTO>;
}
