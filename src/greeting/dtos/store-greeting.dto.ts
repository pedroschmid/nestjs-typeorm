import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class StoreGreetingDTO {
  @ApiProperty()
  @IsNotEmpty()
  public message: string;

  @ApiProperty()
  @IsNotEmpty()
  public active: boolean;
}
