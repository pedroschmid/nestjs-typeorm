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

import { CardEntity } from 'src/card/card.entity';
import { ICardController } from 'src/card/interfaces/card-controller.interface';
import { FindAllCardsResponseDTO } from 'src/card/dtos/find-all-cards-response.dto';
import { StoreCardDTO } from 'src/card/dtos/store-card.dto';
import { UpdateCardDTO } from 'src/card/dtos/update-card.dto';
import { CardService } from 'src/card/card.service';

@ApiTags('Cards')
@ApiBearerAuth()
@Controller({ path: '/cards' })
export class CardController extends BaseController implements ICardController {
  constructor(private readonly cardService: CardService) {
    super();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async findAll(): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Cards fetched successfully';
    const data: FindAllCardsResponseDTO = await this.cardService.findAll();

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  public async findOne(@Param('id') id: string): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Card fetched successfully';
    const data: CardEntity = await this.cardService.findOne(id);

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async store(
    @Body() storeCardDTO: StoreCardDTO,
  ): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.CREATED;
    const message = 'Card created successfully';
    const data: CardEntity = await this.cardService.store(storeCardDTO);

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateCardDTO: UpdateCardDTO,
  ): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Card updated successfully';
    const data: CardEntity = await this.cardService.update(id, updateCardDTO);

    return this.responseJSON(status, message, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  public async remove(@Param('id') id: string): Promise<ResponseJsonDTO> {
    const status: HttpStatus = HttpStatus.OK;
    const message = 'Card deleted successfully';
    const data: CardEntity = await this.cardService.remove(id);

    return this.responseJSON(status, message, data);
  }
}
