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

import { IOrderController } from 'src/order/interfaces/order-controller.interface';

import { OrderEntity } from 'src/order/order.entity';

import { OrderService } from 'src/order/order.service';

import { FindAllOrdersResponseDTO } from 'src/order/dtos/find-all-orders-response.dto';
import { StoreOrderDTO } from 'src/order/dtos/store-order.dto';
import { UpdateOrderDTO } from 'src/order/dtos/update-order.dto';
import { ChangeOrderStatusDTO } from 'src/order/dtos/change-order-status.dto';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller({ path: '/orders' })
export class OrderController
  extends BaseController
  implements IOrderController
{
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async findAll(): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Orders fetched successfully';
    const data: FindAllOrdersResponseDTO = await this.orderService.findAll();

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  public async findOne(@Param('id') id: string): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Order fetched successfully';
    const data: OrderEntity = await this.orderService.findOne(id);

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async store(
    @Body() storeOrderDTO: StoreOrderDTO,
  ): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.CREATED;
    const message = 'Order created successfully';
    const data: OrderEntity = await this.orderService.store(storeOrderDTO);

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateOrderDTO: UpdateOrderDTO,
  ): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Order updated successfully';
    const data: OrderEntity = await this.orderService.update(
      id,
      updateOrderDTO,
    );

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  public async remove(@Param('id') id: string): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Order deleted successfully';
    const data: OrderEntity = await this.orderService.remove(id);

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id/status')
  public async changeStatus(
    @Param('id') id: string,
    @Body() changeOrderStatusDTO: ChangeOrderStatusDTO,
  ): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Order status changed successfully';
    const data: OrderEntity = await this.orderService.changeStatus(
      id,
      changeOrderStatusDTO,
    );

    return this.responseJSON(status, message, data);
  }
}
