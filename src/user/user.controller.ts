import {
  Controller,
  HttpStatus,
  UseGuards,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { BaseController } from 'src/base/controller.base';
import { ResponseJsonDTO } from 'src/base/dtos/response-json.dto';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { UserEntity } from 'src/user/user.entity';
import { IUserController } from 'src/user/interfaces/user-controller.interface';
import { FindAllUsersResponseDTO } from 'src/user/dtos/find-all-users-response.dto';
import { StoreUserDTO } from 'src/user/dtos/store-user.dto';
import { UpdateUserDTO } from 'src/user/dtos/update-user.dto';
import { UserService } from 'src/user/user.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller({ path: '/users' })
export class UserController extends BaseController implements IUserController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async findAll(): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Users fetched successfully';
    const data: FindAllUsersResponseDTO = await this.userService.findAll();

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  public async findOne(@Param('id') id: string): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'User fetched successfully';
    const data: UserEntity = await this.userService.findOne(id);

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async store(
    @Body() storeUserDTO: StoreUserDTO,
  ): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.CREATED;
    const message = 'User created successfully';
    const data: UserEntity = await this.userService.store(storeUserDTO);

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'User updated successfully';
    const data: UserEntity = await this.userService.update(id, updateUserDTO);

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  public async remove(@Param('id') id: string): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'User deleted successfully';
    const data: UserEntity = await this.userService.remove(id);

    return this.responseJSON(status, message, data);
  }
}
