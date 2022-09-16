import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/user/user.module';
import { AddressModule } from 'src/address/address.module';

import { OrderEntity } from 'src/order/order.entity';
import { OrderController } from 'src/order/order.controller';
import { OrderService } from 'src/order/order.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), UserModule, AddressModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
