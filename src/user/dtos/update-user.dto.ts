import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber } from 'class-validator';

import { StoreUserDTO } from 'src/user/dtos/store-user.dto';

export class UpdateUserDTO extends StoreUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public confirmationCode: number;
}
