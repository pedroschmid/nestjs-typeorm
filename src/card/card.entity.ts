import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from 'src/base/entity.base';
import { UserEntity } from 'src/user/user.entity';

@Entity({ name: 'cards' })
export class CardEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.cards)
  @JoinColumn({ name: 'user_id' })
  public user?: UserEntity;

  @Column({ name: 'number', unique: true, nullable: false })
  public number: number;

  @Column({ name: 'card_holder', unique: false, nullable: false })
  public cardholder: string;

  @Column({ name: 'due_date', unique: false, nullable: false })
  public dueDate: string;

  @Column({ name: 'cvc', unique: false, nullable: false })
  public cvc: number;

  @Column({ name: 'document', unique: true, nullable: false })
  public document: string;

  @Column({ name: 'nick_name', unique: false, nullable: false })
  public nickName: string;
}
