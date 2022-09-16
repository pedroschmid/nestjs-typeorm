import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from 'src/base/entity.base';
import { UserEntity } from 'src/user/user.entity';

import { EState } from 'src/address/enums/state.enum';

@Entity({ name: 'addresses' })
export class AddressEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @JoinColumn({ name: 'user_id' })
  public user?: UserEntity;

  @Column({ name: 'state', unique: false, nullable: false })
  public state: EState;

  @Column({ name: 'city', unique: false, nullable: false })
  public city: string;

  @Column({ name: 'street', unique: false, nullable: false })
  public street: string;

  @Column({ name: 'neighbourhood', unique: false, nullable: false })
  public neighbourhood: string;

  @Column({ name: 'number', unique: false, nullable: false })
  public number: number;

  @Column({ name: 'complement', unique: false, nullable: false })
  public complement: string;

  @Column({ name: 'reference', unique: false, nullable: false })
  public reference: string;
}
