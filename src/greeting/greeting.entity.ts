import { Entity, Column } from 'typeorm';

import { BaseEntity } from 'src/base/entity.base';

@Entity({ name: 'greetings' })
export class GreetingEntity extends BaseEntity {
  @Column({ name: 'message', unique: true, nullable: false })
  public message: string;

  @Column({ name: 'active', unique: true, nullable: false })
  public active: boolean;
}
