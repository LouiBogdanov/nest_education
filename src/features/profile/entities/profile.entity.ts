import { UserEntity } from '@features/user/entities/user.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('profiles')
export class ProfileEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 128 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 128 })
  lastName: string;

  @OneToOne(() => UserEntity, (user) => user.profile)
  user: UserEntity;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;
}
