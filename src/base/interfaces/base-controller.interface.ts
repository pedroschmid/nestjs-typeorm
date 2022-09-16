import { HttpStatus } from '@nestjs/common';

import { ResponseJsonDTO } from 'src/base/dtos/response-json.dto';

export interface IBaseController {
  responseJSON(
    status: HttpStatus,
    message?: string,
    data?: any,
  ): ResponseJsonDTO;
}
