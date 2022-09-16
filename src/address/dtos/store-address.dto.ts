import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsEnum } from 'class-validator';

import { EState } from 'src/address/enums/state.enum';

export class StoreAddressDTO {
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(EState)
  state: EState;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  neighbourhood: string;

  @ApiProperty()
  @IsNotEmpty()
  number: number;

  @ApiProperty()
  @IsNotEmpty()
  complement: string;

  @ApiProperty()
  @IsNotEmpty()
  reference: string;
}
