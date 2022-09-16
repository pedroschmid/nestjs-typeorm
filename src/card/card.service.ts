import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { CardEntity } from 'src/card/card.entity';
import { ICardService } from 'src/card/interfaces/card-service.interface';
import { FindAllCardsResponseDTO } from 'src/card/dtos/find-all-cards-response.dto';
import { StoreCardDTO } from 'src/card/dtos/store-card.dto';
import { UpdateCardDTO } from 'src/card/dtos/update-card.dto';

import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CardService implements ICardService {
  private readonly logger = new Logger(CardService.name);

  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
    private readonly userService: UserService,
  ) {}

  public async findAll(): Promise<FindAllCardsResponseDTO> {
    const [cards, total]: [Array<CardEntity>, number] =
      await this.cardRepository.findAndCount();

    return { total, cards };
  }

  public async findOne(id: string): Promise<CardEntity> {
    try {
      return await this.cardRepository.findOneByOrFail({ id });
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException(
        `Card with id ${id} not found!`,
        error.message,
      );
    }
  }

  public async store(storeCardDTO: StoreCardDTO): Promise<CardEntity> {
    const user: UserEntity = await this.userService.findOne(
      storeCardDTO.userId,
    );

    try {
      const entity: CardEntity = plainToInstance(CardEntity, {
        storeCardDTO,
      });

      entity.user = user;

      return await this.cardRepository.save(entity);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Error while creating card!',
        error.message,
      );
    }
  }

  public async update(
    id: string,
    updateCardDTO: UpdateCardDTO,
  ): Promise<CardEntity> {
    try {
      const existingCard: CardEntity = await this.cardRepository.findOneBy({
        id,
      });

      if (!existingCard) {
        throw new NotFoundException(`Card with id ${id} not found!`);
      }

      const entity: CardEntity = plainToInstance(CardEntity, {
        id: existingCard.id,
        ...updateCardDTO,
      });

      return await this.cardRepository.save(entity);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Error while updating card!',
        error.message,
      );
    }
  }

  public async remove(id: string): Promise<CardEntity> {
    try {
      const existingCard: CardEntity = await this.cardRepository.findOneBy({
        id,
      });

      if (!existingCard) {
        throw new NotFoundException(`card with id ${id} not found!`);
      }

      return await this.cardRepository.remove(existingCard);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Error while removing card!',
        error.message,
      );
    }
  }
}
