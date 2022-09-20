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

import { IGreetingController } from './interfaces/greeting-controller.interface';

import { GreetingEntity } from 'src/greeting/greeting.entity';

import { GreetingService } from 'src/greeting/greeting.service';

import { FindAllGreetingsResponseDTO } from 'src/greeting/dtos/find-all-greetings-response.dto';
import { StoreGreetingDTO } from 'src/greeting/dtos/store-greeting.dto';
import { UpdateGreetingDTO } from 'src/greeting/dtos/update-greeting.dto';

@ApiTags('Greetings')
@ApiBearerAuth()
@Controller({ path: '/greetings' })
export class GreetingController
  extends BaseController
  implements IGreetingController
{
  constructor(private readonly greetingService: GreetingService) {
    super();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async findAll(): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Greetings fetched successfully';
    const data: FindAllGreetingsResponseDTO =
      await this.greetingService.findAll();

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  public async findOne(@Param('id') id: string): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Greeting fetched successfully';
    const data: GreetingEntity = await this.greetingService.findOne(id);

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async store(
    @Body() storeGreetingDTO: StoreGreetingDTO,
  ): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.CREATED;
    const message = 'Greeting created successfully';
    const data: GreetingEntity = await this.greetingService.store(
      storeGreetingDTO,
    );

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateGreetingDTO: UpdateGreetingDTO,
  ): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Greeting updated successfully';
    const data: GreetingEntity = await this.greetingService.update(
      id,
      updateGreetingDTO,
    );

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  public async remove(@Param('id') id: string): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Greeting deleted successfully';
    const data: GreetingEntity = await this.greetingService.remove(id);

    return this.responseJSON(status, message, data);
  }
}
