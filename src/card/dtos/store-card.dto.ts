import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class StoreCardDTO {
  @ApiProperty()
  @IsNotEmpty()
  public userId: string;

  @ApiProperty()
  @IsNotEmpty()
  public number: number;

  @ApiProperty()
  @IsNotEmpty()
  public cardholder: string;

  @ApiProperty()
  @IsNotEmpty()
  public dueDate: string;

  @ApiProperty()
  @IsNotEmpty()
  public cvc: number;

  @ApiProperty()
  @IsNotEmpty()
  public document: string;

  @ApiProperty()
  @IsNotEmpty()
  public nickName: string;
}
