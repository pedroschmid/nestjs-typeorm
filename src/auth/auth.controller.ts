import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BaseController } from 'src/base/controller.base';
import { ResponseJsonDTO } from 'src/base/dtos/response-json.dto';

import { LoginPayloadDTO } from 'src/auth/dtos/login-payload.dto';
import { LoginResponseDTO } from 'src/auth/dtos/login-response.dto';
import { ChangePasswordPayloadDTO } from 'src/auth/dtos/change-password-payload.dto';
import { AuthService } from 'src/auth/auth.service';

import { UserEntity } from 'src/user/user.entity';
import { StoreUserDTO } from 'src/user/dtos/store-user.dto';
import { SendConfirmationCodePayloadDTO } from './dtos/send-confirmation-code-payload.dto';

@ApiTags('Authentication')
@Controller({ path: '/auth' })
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('/login')
  async login(
    @Body() loginPayloadDTO: LoginPayloadDTO,
  ): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Logged in successfully';
    const data: LoginResponseDTO = await this.authService.login(
      loginPayloadDTO,
    );

    return this.responseJSON(status, message, data);
  }

  @Post('/register')
  async register(@Body() storeUserDTO: StoreUserDTO): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.CREATED;
    const message = 'Registered successfully';
    const data: UserEntity = await this.authService.register(storeUserDTO);

    return this.responseJSON(status, message, data);
  }

  @Post('/forgot_password/send_confirmation_code')
  async sendConfirmationCode(
    @Body() sendConfirmationCodePayloadDTO: SendConfirmationCodePayloadDTO,
  ): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Confirmation code sent successfully';
    await this.authService.sendConfirmationCode(sendConfirmationCodePayloadDTO);

    return this.responseJSON(status, message);
  }

  @Post('/forgot_password/change_password')
  async changePassword(
    @Body() changePasswordPayloadDTO: ChangePasswordPayloadDTO,
  ): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Password changed successfully';
    await this.authService.changePassword(changePasswordPayloadDTO);

    return this.responseJSON(status, message);
  }
}
