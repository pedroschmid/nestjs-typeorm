import { AddressEntity } from 'src/address/address.entity';
import { FindAllAddressessResponseDTO } from 'src/address/dtos/find-all-addresses-response.dto';
import { StoreAddressDTO } from 'src/address/dtos/store-address.dto';
import { UpdateAddressDTO } from 'src/address/dtos/update-address.dto';

export interface IAddressService {
  findAll(): Promise<FindAllAddressessResponseDTO>;
  findOne(id: string): Promise<AddressEntity>;
  store(storeAddressDTO: StoreAddressDTO): Promise<AddressEntity>;
  update(
    id: string,
    updateAddressDTO: UpdateAddressDTO,
  ): Promise<AddressEntity>;
  remove(id: string): Promise<AddressEntity>;
}
