import {
  Controller,
  HttpStatus,
  UseGuards,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { BaseController } from 'src/base/controller.base';
import { ResponseJsonDTO } from 'src/base/dtos/response-json.dto';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { IAddressController } from 'src/address/interfaces/address-controller.interface';

import { AddressEntity } from 'src/address/address.entity';

import { AddressService } from 'src/address/address.service';

import { FindAllAddressessResponseDTO } from 'src/address/dtos/find-all-addresses-response.dto';
import { StoreAddressDTO } from 'src/address/dtos/store-address.dto';
import { UpdateAddressDTO } from 'src/address/dtos/update-address.dto';

@ApiTags('Addresses')
@ApiBearerAuth()
@Controller({ path: '/addresses' })
export class AddressController
  extends BaseController
  implements IAddressController
{
  constructor(private readonly addressService: AddressService) {
    super();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async findAll(): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Addresses fetched successfully';
    const data: FindAllAddressessResponseDTO =
      await this.addressService.findAll();

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  public async findOne(@Param('id') id: string): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Address fetched successfully';
    const data: AddressEntity = await this.addressService.findOne(id);

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async store(
    @Body() storeAddressDTO: StoreAddressDTO,
  ): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.CREATED;
    const message = 'Address created successfully';
    const data: AddressEntity = await this.addressService.store(
      storeAddressDTO,
    );

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateAddressDTO: UpdateAddressDTO,
  ): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Address updated successfully';
    const data: AddressEntity = await this.addressService.update(
      id,
      updateAddressDTO,
    );

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  public async remove(@Param('id') id: string): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Address deleted successfully';
    const data: AddressEntity = await this.addressService.remove(id);

    return this.responseJSON(status, message, data);
  }
}
