import { CardEntity } from 'src/card/card.entity';

export class FindAllCardsResponseDTO {
  public total: number;
  public cards: Array<CardEntity>;
}
