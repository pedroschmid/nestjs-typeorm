import { CardEntity } from 'src/card/card.entity';
import { FindAllCardsResponseDTO } from 'src/card/dtos/find-all-cards-response.dto';
import { StoreCardDTO } from 'src/card/dtos/store-card.dto';
import { UpdateCardDTO } from 'src/card/dtos/update-card.dto';

export interface ICardService {
  findAll(): Promise<FindAllCardsResponseDTO>;
  findOne(id: string): Promise<CardEntity>;
  store(storeAddressDTO: StoreCardDTO): Promise<CardEntity>;
  update(id: string, updateAddressDTO: UpdateCardDTO): Promise<CardEntity>;
  remove(id: string): Promise<CardEntity>;
}
