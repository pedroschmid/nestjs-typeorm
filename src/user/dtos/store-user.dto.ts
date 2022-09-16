import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsEnum,
  MinLength,
} from 'class-validator';

import { EUserStatus } from 'src/user/enums/user-status.enum';

export class StoreUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  public document: string;

  @ApiProperty()
  @IsNotEmpty()
  public birthdate: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  public password: string;

  @ApiProperty({ enum: EUserStatus })
  @IsOptional()
  @IsEnum(EUserStatus)
  public status?: EUserStatus;
}
