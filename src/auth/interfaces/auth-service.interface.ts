import { UserEntity } from 'src/user/user.entity';

import { LoginPayloadDTO } from 'src/auth/dtos/login-payload.dto';
import { LoginResponseDTO } from 'src/auth/dtos/login-response.dto';
import { SendConfirmationCodePayloadDTO } from 'src/auth/dtos/send-confirmation-code-payload.dto';
import { ChangePasswordPayloadDTO } from 'src/auth/dtos/change-password-payload.dto';

import { StoreUserDTO } from 'src/user/dtos/store-user.dto';

export interface IAuthService {
  login(loginPayloadDTO: LoginPayloadDTO): Promise<LoginResponseDTO>;
  register(storeUserDTO: StoreUserDTO): Promise<UserEntity>;
  sendConfirmationCode(
    sendConfirmationCodePayloadDTO: SendConfirmationCodePayloadDTO,
  ): Promise<void>;
  changePassword(
    changePasswordPayloadDTO: ChangePasswordPayloadDTO,
  ): Promise<void>;
}
