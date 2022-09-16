import { UserEntity } from 'src/user/user.entity';

export class FindAllUsersResponseDTO {
  public total: number;
  public users: Array<UserEntity>;
}
