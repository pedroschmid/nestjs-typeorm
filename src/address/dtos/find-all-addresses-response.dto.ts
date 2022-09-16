import { AddressEntity } from 'src/address/address.entity';

export class FindAllAddressessResponseDTO {
  public total: number;
  public addresses: Array<AddressEntity>;
}
