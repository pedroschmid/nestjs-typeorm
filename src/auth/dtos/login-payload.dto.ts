import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class LoginPayloadDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  public password: string;
}
