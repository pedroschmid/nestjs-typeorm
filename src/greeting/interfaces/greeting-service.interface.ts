import { GreetingEntity } from 'src/greeting/greeting.entity';

import { FindAllGreetingsResponseDTO } from 'src/greeting/dtos/find-all-greetings-response.dto';
import { StoreGreetingDTO } from 'src/greeting/dtos/store-greeting.dto';
import { UpdateGreetingDTO } from 'src/greeting/dtos/update-greeting.dto';

export interface IGreetingService {
  findAll(): Promise<FindAllGreetingsResponseDTO>;
  findOne(id: string): Promise<GreetingEntity>;
  store(storeGreetingDTO: StoreGreetingDTO): Promise<GreetingEntity>;
  update(
    id: string,
    updateGreetingDTO: UpdateGreetingDTO,
  ): Promise<GreetingEntity>;
  remove(id: string): Promise<GreetingEntity>;
}
