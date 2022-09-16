import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional } from 'class-validator';

export class StoreOrderDTO {
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  addressId: string;

  @ApiProperty()
  @IsNotEmpty()
  solicitationDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  carriedOut: string;

  @ApiProperty()
  @IsNotEmpty()
  estimatedDeliveryDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  deliveryDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  orderStatus: string;
}
