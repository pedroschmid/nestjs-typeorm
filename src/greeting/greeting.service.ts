import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { IGreetingService } from 'src/greeting/interfaces/greeting-service.interface';

import { GreetingEntity } from 'src/greeting/greeting.entity';

import { FindAllGreetingsResponseDTO } from 'src/greeting/dtos/find-all-greetings-response.dto';
import { StoreGreetingDTO } from 'src/greeting/dtos/store-greeting.dto';
import { UpdateGreetingDTO } from 'src/greeting/dtos/update-greeting.dto';

@Injectable()
export class GreetingService implements IGreetingService {
  private readonly logger = new Logger(GreetingService.name);

  constructor(
    @InjectRepository(GreetingEntity)
    private readonly greetingsRepository: Repository<GreetingEntity>,
  ) {}

  public async findAll(): Promise<FindAllGreetingsResponseDTO> {
    const [greetings, total]: [Array<GreetingEntity>, number] =
      await this.greetingsRepository.findAndCount();

    return { total, greetings };
  }

  public async findOne(id: string): Promise<GreetingEntity> {
    try {
      return await this.greetingsRepository.findOneByOrFail({ id });
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException(
        `Greeting with id ${id} not found!`,
        error.message,
      );
    }
  }

  public async store(
    storeGreetingDTO: StoreGreetingDTO,
  ): Promise<GreetingEntity> {
    try {
      const entity: GreetingEntity = plainToInstance(
        GreetingEntity,
        storeGreetingDTO,
      );
      return await this.greetingsRepository.save(entity);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Error while creating greeting!',
        error.message,
      );
    }
  }

  public async update(
    id: string,
    updateGreetingDTO: UpdateGreetingDTO,
  ): Promise<GreetingEntity> {
    try {
      const existingGreeting: GreetingEntity =
        await this.greetingsRepository.findOneBy({
          id,
        });

      if (!existingGreeting) {
        throw new NotFoundException(`User with id ${id} not found!`);
      }

      const entity: GreetingEntity = plainToInstance(GreetingEntity, {
        id: existingGreeting.id,
        ...updateGreetingDTO,
      });

      return await this.greetingsRepository.save(entity);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Error while updating greeting!',
        error.message,
      );
    }
  }

  public async remove(id: string): Promise<GreetingEntity> {
    try {
      const existingUser: GreetingEntity =
        await this.greetingsRepository.findOneBy({
          id,
        });

      if (!existingUser) {
        throw new NotFoundException(`User with id ${id} not found!`);
      }

      return await this.greetingsRepository.remove(existingUser);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Error while removing greeting!',
        error.message,
      );
    }
  }
}
