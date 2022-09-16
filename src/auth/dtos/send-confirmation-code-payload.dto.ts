import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsEmail } from 'class-validator';

export class SendConfirmationCodePayloadDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}
