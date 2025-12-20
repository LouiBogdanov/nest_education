import { ProfileEntity } from '@features/profile/entities/profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 512 })
  email: string;

  @Column({ name: 'profile_id', type: 'int', nullable: false })
  profileId: number;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    cascade: true,
  })
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;
}
