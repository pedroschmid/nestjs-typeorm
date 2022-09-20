import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GreetingEntity } from 'src/greeting/greeting.entity';
import { GreetingController } from 'src/greeting/greeting.controller';
import { GreetingService } from 'src/greeting/greeting.service';

@Module({
  imports: [TypeOrmModule.forFeature([GreetingEntity])],
  controllers: [GreetingController],
  providers: [GreetingService],
  exports: [GreetingService],
})
export class GreetingModule {}
