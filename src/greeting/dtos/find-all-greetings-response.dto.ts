import { GreetingEntity } from 'src/greeting/greeting.entity';

export class FindAllGreetingsResponseDTO {
  public total: number;
  public greetings: Array<GreetingEntity>;
}
