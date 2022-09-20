import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PostgresModule } from 'src/database/postgres.module';
import { MailModule } from 'src/mail/mail.module';
import { HealthModule } from 'src/health/health.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { OrderModule } from 'src/order/order.module';
import { AddressModule } from 'src/address/address.module';
import { CardModule } from 'src/card/card.module';
import { GreetingModule } from 'src/greeting/greeting.module';

@Module({
  imports: [
    /* Environment variables */
    ConfigModule.forRoot({ envFilePath: '.env' }),
    /* Database module */
    PostgresModule,
    /* Mailer module */
    MailModule,
    /* Health module */
    HealthModule,
    /* Application modules */
    AuthModule,
    UserModule,
    OrderModule,
    AddressModule,
    CardModule,
    GreetingModule,
  ],
})
export class AppModule {}
