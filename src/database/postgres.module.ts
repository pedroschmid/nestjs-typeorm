import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserEntity } from 'src/user/user.entity';
import { OrderEntity } from 'src/order/order.entity';
import { AddressEntity } from 'src/address/address.entity';
import { CardEntity } from 'src/card/card.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        database: configService.get<string>('POSTGRES_DB'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        entities: [UserEntity, OrderEntity, AddressEntity, CardEntity],
        synchronize: true,
      }),
    }),
  ],
})
export class PostgresModule {}
