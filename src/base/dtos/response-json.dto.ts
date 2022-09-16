import { HttpStatus } from '@nestjs/common';

export class ResponseJsonDTO {
  public status: HttpStatus;
  public message?: string;
  public data?: any;
}
