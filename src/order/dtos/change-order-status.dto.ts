import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class ChangeOrderStatusDTO {
  @ApiProperty()
  @IsNotEmpty()
  status: string;
}
