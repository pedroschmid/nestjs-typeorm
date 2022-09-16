import { ResponseJsonDTO } from 'src/base/dtos/response-json.dto';

import { StoreUserDTO } from 'src/user/dtos/store-user.dto';
import { UpdateUserDTO } from 'src/user/dtos/update-user.dto';

export interface IUserController {
  findAll(): Promise<ResponseJsonDTO>;
  findOne(id: string): Promise<ResponseJsonDTO>;
  store(storeUserDTO: StoreUserDTO): Promise<ResponseJsonDTO>;
  update(id: string, updateUserDTO: UpdateUserDTO): Promise<ResponseJsonDTO>;
  remove(id: string): Promise<ResponseJsonDTO>;
}
