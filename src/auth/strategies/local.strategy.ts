import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  public async validate(id: string): Promise<any> {
    const user: UserEntity = await this.userService.findOne(id);

    if (!user) {
      throw new UnauthorizedException('Could not authroize request!');
    }

    return user;
  }
}
