import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsEmail, MinLength, IsNumber } from 'class-validator';

export class ChangePasswordPayloadDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public confirmationCode: number;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  public newPassword: string;
}
