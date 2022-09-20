import { ResponseJsonDTO } from 'src/base/dtos/response-json.dto';

import { StoreGreetingDTO } from 'src/greeting/dtos/store-greeting.dto';
import { UpdateGreetingDTO } from 'src/greeting/dtos/update-greeting.dto';

export interface IGreetingController {
  findAll(): Promise<ResponseJsonDTO>;
  findOne(id: string): Promise<ResponseJsonDTO>;
  store(storeGreetingDTO: StoreGreetingDTO): Promise<ResponseJsonDTO>;
  update(
    id: string,
    updateGreetingDTO: UpdateGreetingDTO,
  ): Promise<ResponseJsonDTO>;
  remove(id: string): Promise<ResponseJsonDTO>;
}
