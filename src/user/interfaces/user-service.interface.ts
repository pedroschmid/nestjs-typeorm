import { UserEntity } from 'src/user/user.entity';

import { FindAllUsersResponseDTO } from 'src/user/dtos/find-all-users-response.dto';
import { StoreUserDTO } from 'src/user/dtos/store-user.dto';
import { UpdateUserDTO } from 'src/user/dtos/update-user.dto';

export interface IUserService {
  findAll(): Promise<FindAllUsersResponseDTO>;
  findOne(id: string): Promise<UserEntity>;
  findOneByEmail(email: string): Promise<UserEntity>;
  store(storeUserDTO: StoreUserDTO): Promise<UserEntity>;
  update(id: string, updateUserDTO: UpdateUserDTO): Promise<UserEntity>;
  remove(id: string): Promise<UserEntity>;
}
