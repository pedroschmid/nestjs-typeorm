import { HttpStatus } from '@nestjs/common';

import { IBaseController } from 'src/base/interfaces/base-controller.interface';
import { ResponseJsonDTO } from 'src/base/dtos/response-json.dto';

export class BaseController implements IBaseController {
  public responseJSON(
    status: HttpStatus,
    message?: string,
    data?: any,
  ): ResponseJsonDTO {
    const responseJsonDTO: ResponseJsonDTO = { status, message, data };
    return responseJsonDTO;
  }
}
