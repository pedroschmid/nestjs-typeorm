import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from 'src/base/entity.base';
import { UserEntity } from 'src/user/user.entity';
import { AddressEntity } from 'src/address/address.entity';

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  public user: UserEntity;

  @OneToOne(() => AddressEntity)
  @JoinColumn({ name: 'address_id' })
  public address: AddressEntity;

  @Column({ name: 'solicitation_date', unique: false, nullable: false })
  public solicitationDate: Date;

  @Column({ name: 'carried_out', unique: false, nullable: false })
  public carriedOut: string;

  @Column({ name: 'estimated_delivery_date', unique: false, nullable: false })
  public estimatedDeliveryDate: Date;

  @Column({ name: 'delivery_date', unique: false, nullable: false })
  public deliveryDate: Date;

  @Column({ name: 'price', unique: false, nullable: false })
  public price: number;

  @Column({ name: 'order_status', unique: false, nullable: false })
  public orderStatus: string;
}
