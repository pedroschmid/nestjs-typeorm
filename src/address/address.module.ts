import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/user/user.module';

import { AddressEntity } from 'src/address/address.entity';
import { AddressController } from 'src/address/address.controller';
import { AddressService } from 'src/address/address.service';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity]), UserModule],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
