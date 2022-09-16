import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { IUserService } from 'src/user/interfaces/user-service.interface';

import { UserEntity } from 'src/user/user.entity';

import { FindAllUsersResponseDTO } from 'src/user/dtos/find-all-users-response.dto';
import { StoreUserDTO } from 'src/user/dtos/store-user.dto';
import { UpdateUserDTO } from 'src/user/dtos/update-user.dto';

@Injectable()
export class UserService implements IUserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findAll(): Promise<FindAllUsersResponseDTO> {
    const [users, total]: [Array<UserEntity>, number] =
      await this.userRepository.findAndCount();

    return { total, users };
  }

  public async findOne(id: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOneByOrFail({ id });
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException(
        `User with id ${id} not found!`,
        error.message,
      );
    }
  }

  public async findOneByEmail(email: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOneByOrFail({ email });
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException(
        `User with email ${email} not found!`,
        error.message,
      );
    }
  }

  public async store(storeUserDTO: StoreUserDTO): Promise<UserEntity> {
    try {
      const entity: UserEntity = plainToInstance(UserEntity, storeUserDTO);
      return await this.userRepository.save(entity);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Error while creating user!',
        error.message,
      );
    }
  }

  public async update(
    id: string,
    updateUserDTO: UpdateUserDTO,
  ): Promise<UserEntity> {
    try {
      const existingUser: UserEntity = await this.userRepository.findOneBy({
        id,
      });

      if (!existingUser) {
        throw new NotFoundException(`User with id ${id} not found!`);
      }

      const entity: UserEntity = plainToInstance(UserEntity, {
        id: existingUser.id,
        ...updateUserDTO,
      });

      return await this.userRepository.save(entity);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Error while updating user!',
        error.message,
      );
    }
  }

  public async remove(id: string): Promise<UserEntity> {
    try {
      const existingUser: UserEntity = await this.userRepository.findOneBy({
        id,
      });

      if (!existingUser) {
        throw new NotFoundException(`User with id ${id} not found!`);
      }

      return await this.userRepository.remove(existingUser);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Error while removing user!',
        error.message,
      );
    }
  }
}
