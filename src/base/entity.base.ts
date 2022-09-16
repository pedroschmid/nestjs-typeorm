import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    unique: false,
    nullable: false,
  })
  public createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    unique: false,
    nullable: true,
  })
  public updatedAt: string;
}
