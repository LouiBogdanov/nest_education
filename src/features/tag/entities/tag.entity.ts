import { ProductEntity } from '@features/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tags' })
export class TagEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 32, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @ManyToMany(() => ProductEntity, (product) => product.tags)
  products: ProductEntity[];

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;
}
