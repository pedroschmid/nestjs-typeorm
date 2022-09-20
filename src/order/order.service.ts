import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { OrderEntity } from 'src/order/order.entity';
import { IOrderService } from 'src/order/interfaces/order-service.interface';
import { FindAllOrdersResponseDTO } from 'src/order/dtos/find-all-orders-response.dto';
import { StoreOrderDTO } from 'src/order/dtos/store-order.dto';
import { UpdateOrderDTO } from 'src/order/dtos/update-order.dto';
import { ChangeOrderStatusDTO } from 'src/order/dtos/change-order-status.dto';

import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

import { AddressEntity } from 'src/address/address.entity';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class OrderService implements IOrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly userService: UserService,
    private readonly addressService: AddressService,
  ) {}

  public async findAll(): Promise<FindAllOrdersResponseDTO> {
    const [orders, total]: [Array<OrderEntity>, number] =
      await this.orderRepository.findAndCount();

    return { total, orders };
  }

  public async findOne(id: string): Promise<OrderEntity> {
    try {
      return await this.orderRepository.findOneByOrFail({ id });
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException(
        `Order with id ${id} not found!`,
        error.message,
      );
    }
  }

  public async store(storeOrderDTO: StoreOrderDTO): Promise<OrderEntity> {
    const user: UserEntity = await this.userService.findOne(
      storeOrderDTO.userId,
    );

    const address: AddressEntity = await this.addressService.findOne(
      storeOrderDTO.addressId,
    );

    try {
      const entity: OrderEntity = plainToInstance(OrderEntity, {
        storeOrderDTO,
      });

      entity.user = user;
      entity.address = address;

      return await this.orderRepository.save(entity);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Error while creating order!',
        error.message,
      );
    }
  }

  public async update(
    id: string,
    updateOrderDTO: UpdateOrderDTO,
  ): Promise<OrderEntity> {
    try {
      const existingOrder: OrderEntity = await this.orderRepository.findOneBy({
        id,
      });

      if (!existingOrder) {
        throw new NotFoundException(`Order with id ${id} not found!`);
      }

      const entity: OrderEntity = plainToInstance(OrderEntity, {
        id: existingOrder.id,
        ...updateOrderDTO,
      });

      return await this.orderRepository.save(entity);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Error while updating order!',
        error.message,
      );
    }
  }

  public async remove(id: string): Promise<OrderEntity> {
    try {
      const existingOrder: OrderEntity = await this.orderRepository.findOneBy({
        id,
      });

      if (!existingOrder) {
        throw new NotFoundException(`order with id ${id} not found!`);
      }

      return await this.orderRepository.remove(existingOrder);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Error while removing order!',
        error.message,
      );
    }
  }

  public async changeStatus(
    id: string,
    changeOrderStatusDTO: ChangeOrderStatusDTO,
  ): Promise<OrderEntity> {
    try {
      const existingOrder: OrderEntity = await this.orderRepository.findOneBy({
        id,
      });

      if (!existingOrder) {
        throw new NotFoundException(`Order with id ${id} not found!`);
      }

      const entity: OrderEntity = plainToInstance(OrderEntity, {
        id: existingOrder.id,
        status: changeOrderStatusDTO.status,
      });

      return await this.orderRepository.save(entity);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Error while updating order status!',
        error.message,
      );
    }
  }
}
