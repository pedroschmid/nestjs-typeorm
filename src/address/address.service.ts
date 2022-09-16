import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { AddressEntity } from 'src/address/address.entity';
import { IAddressService } from 'src/address/interfaces/address-service.interface';
import { FindAllAddressessResponseDTO } from 'src/address/dtos/find-all-addresses-response.dto';
import { StoreAddressDTO } from 'src/address/dtos/store-address.dto';
import { UpdateAddressDTO } from 'src/address/dtos/update-address.dto';

import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AddressService implements IAddressService {
  private readonly logger = new Logger(AddressService.name);

  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
  ) {}

  public async findAll(): Promise<FindAllAddressessResponseDTO> {
    const [addresses, total]: [Array<AddressEntity>, number] =
      await this.addressRepository.findAndCount();

    return { total, addresses };
  }

  public async findOne(id: string): Promise<AddressEntity> {
    try {
      return await this.addressRepository.findOneByOrFail({ id });
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException(
        `Address with id ${id} not found!`,
        error.message,
      );
    }
  }

  public async store(storeAddressDTO: StoreAddressDTO): Promise<AddressEntity> {
    const user: UserEntity = await this.userService.findOne(
      storeAddressDTO.userId,
    );

    try {
      const entity: AddressEntity = plainToInstance(AddressEntity, {
        storeAddressDTO,
      });

      entity.user = user;

      return await this.addressRepository.save(entity);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Error while creating address!',
        error.message,
      );
    }
  }

  public async update(
    id: string,
    updateAddressDTO: UpdateAddressDTO,
  ): Promise<AddressEntity> {
    try {
      const existingAddress: AddressEntity =
        await this.addressRepository.findOneBy({ id });

      if (!existingAddress) {
        throw new NotFoundException(`Address with id ${id} not found!`);
      }

      const entity: AddressEntity = plainToInstance(AddressEntity, {
        id: existingAddress.id,
        ...updateAddressDTO,
      });

      return await this.addressRepository.save(entity);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Error while updating address!',
        error.message,
      );
    }
  }

  public async remove(id: string): Promise<AddressEntity> {
    try {
      const existingAddress: AddressEntity =
        await this.addressRepository.findOneBy({ id });

      if (!existingAddress) {
        throw new NotFoundException(`Address with id ${id} not found!`);
      }

      return await this.addressRepository.remove(existingAddress);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Error while removing address!',
        error.message,
      );
    }
  }
}
