import { ResponseJsonDTO } from 'src/base/dtos/response-json.dto';

import { StoreCardDTO } from 'src/card/dtos/store-card.dto';
import { UpdateCardDTO } from 'src/card/dtos/update-card.dto';

export interface ICardController {
  findAll(): Promise<ResponseJsonDTO>;
  findOne(id: string): Promise<ResponseJsonDTO>;
  store(storeCardDTO: StoreCardDTO): Promise<ResponseJsonDTO>;
  update(id: string, updateCardDTO: UpdateCardDTO): Promise<ResponseJsonDTO>;
  remove(id: string): Promise<ResponseJsonDTO>;
}
