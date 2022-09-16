import { Entity, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { BaseEntity } from 'src/base/entity.base';
import { OrderEntity } from 'src/order/order.entity';
import { AddressEntity } from 'src/address/address.entity';
import { CardEntity } from 'src/card/card.entity';

import { EUserStatus } from 'src/user/enums/user-status.enum';

// import { Order } from './order.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @OneToMany(() => OrderEntity, (order) => order.user)
  public orders: OrderEntity[];

  @OneToMany(() => AddressEntity, (address) => address.user)
  public addresses: AddressEntity[];

  @OneToMany(() => CardEntity, (card) => card.user)
  public cards: CardEntity[];

  @Column({ name: 'email', unique: true, nullable: false })
  public email: string;

  @Column({ name: 'document', unique: true, nullable: false })
  public document: string;

  @Column({ name: 'birthdate', unique: false, nullable: false })
  public birthdate: string;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'password', unique: false, nullable: false })
  public password: string;

  @Column({ name: 'confirmation_code', unique: true, nullable: true })
  public confirmationCode: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: EUserStatus,
    default: EUserStatus.PENDING,
  })
  public status: EUserStatus;

  @BeforeInsert()
  @BeforeUpdate()
  public async hashPassword(): Promise<void> {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
}
