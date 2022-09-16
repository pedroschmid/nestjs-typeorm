import {
  Injectable,
  Logger,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { IAuthService } from 'src/auth/interfaces/auth-service.interface';
import { JwtPayloadDTO } from 'src/auth/dtos/jwt-payload.dto';
import { LoginPayloadDTO } from 'src/auth/dtos/login-payload.dto';
import { LoginResponseDTO } from 'src/auth/dtos/login-response.dto';
import { SendConfirmationCodePayloadDTO } from 'src/auth/dtos/send-confirmation-code-payload.dto';
import { ChangePasswordPayloadDTO } from 'src/auth/dtos/change-password-payload.dto';

import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { StoreUserDTO } from 'src/user/dtos/store-user.dto';

import { MailService } from 'src/mail/mail.service';
import { UpdateUserDTO } from 'src/user/dtos/update-user.dto';

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  public async login(
    loginPayloadDTO: LoginPayloadDTO,
  ): Promise<LoginResponseDTO> {
    try {
      const validUser = await this.validateUser(
        loginPayloadDTO.email,
        loginPayloadDTO.password,
      );

      const payload: JwtPayloadDTO = {
        id: validUser.id,
        email: validUser.email,
      };

      const accessToken: string = this.jwtService.sign(payload);

      return { accessToken, expirationTime: '1h' };
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException(
        'Could not login, invalid credentials!',
        error.message,
      );
    }
  }

  public async register(storeUserDTO: StoreUserDTO): Promise<UserEntity> {
    return await this.userService.store(storeUserDTO);
  }

  public async sendConfirmationCode(
    sendConfirmationCodePayloadDTO: SendConfirmationCodePayloadDTO,
  ): Promise<void> {
    try {
      const confirmationCode: number = this.generateConfirmationCode();

      const existingUser: UserEntity = await this.userService.findOneByEmail(
        sendConfirmationCodePayloadDTO.email,
      );

      await this.mailService.sendConfirmationCode(
        sendConfirmationCodePayloadDTO.email,
        confirmationCode,
      );

      const updateUserDTO: UpdateUserDTO = {
        email: existingUser.email,
        document: existingUser.document,
        birthdate: existingUser.birthdate,
        password: existingUser.password,
        confirmationCode,
        status: existingUser.status,
      };

      await this.userService.update(existingUser.id, updateUserDTO);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error while sending confirmation code!',
        error.message,
      );
    }
  }

  public async changePassword(
    changePasswordPayloadDTO: ChangePasswordPayloadDTO,
  ): Promise<void> {
    try {
      const existingUser: UserEntity = await this.userService.findOneByEmail(
        changePasswordPayloadDTO.email,
      );

      const validConfirmationCode = this.validateConfirmationCode(
        changePasswordPayloadDTO.confirmationCode,
        existingUser.confirmationCode,
      );

      if (!validConfirmationCode) {
        throw new BadRequestException('Invalid confirmation code');
      }

      const updateUserDTO: UpdateUserDTO = {
        email: existingUser.email,
        document: existingUser.document,
        birthdate: existingUser.birthdate,
        password: changePasswordPayloadDTO.newPassword,
        confirmationCode: null,
        status: existingUser.status,
      };

      await this.userService.update(existingUser.id, updateUserDTO);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error while changing password!',
        error.message,
      );
    }
  }

  /* Private methods */
  private async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const existingUser: UserEntity = await this.userService.findOneByEmail(
      email,
    );
    const validPassword: boolean = await this.validatePassword(
      password,
      existingUser.password,
    );

    return existingUser && validPassword ? existingUser : null;
  }

  private async validatePassword(
    plainTextPassword: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    const isValid: boolean = await bcrypt.compare(
      plainTextPassword,
      encryptedPassword,
    );

    return isValid ? true : false;
  }

  private validateConfirmationCode(
    sentConfirmationCode: number,
    databaseConfirmationCode: number,
  ): boolean {
    return sentConfirmationCode === databaseConfirmationCode ? true : false;
  }

  private generateConfirmationCode(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }
}
