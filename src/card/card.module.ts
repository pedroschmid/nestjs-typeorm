import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/user/user.module';

import { CardEntity } from 'src/card/card.entity';
import { CardController } from 'src/card/card.controller';
import { CardService } from 'src/card/card.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity]), UserModule],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
