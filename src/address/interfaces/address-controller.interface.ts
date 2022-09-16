import { ResponseJsonDTO } from 'src/base/dtos/response-json.dto';

import { StoreAddressDTO } from 'src/address/dtos/store-address.dto';
import { UpdateAddressDTO } from 'src/address/dtos/update-address.dto';

export interface IAddressController {
  findAll(): Promise<ResponseJsonDTO>;
  findOne(id: string): Promise<ResponseJsonDTO>;
  store(storeAddressDTO: StoreAddressDTO): Promise<ResponseJsonDTO>;
  update(
    id: string,
    updateAddressDTO: UpdateAddressDTO,
  ): Promise<ResponseJsonDTO>;
  remove(id: string): Promise<ResponseJsonDTO>;
}
