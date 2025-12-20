import { CategoryEntity } from '@features/all-entities';
import { TagEntity } from '@features/tag/entities/tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 128 })
  title: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ name: 'category_id', type: 'int' })
  categoryId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @ManyToMany(() => TagEntity, (tag) => tag.products)
  @JoinTable({
    name: 'product_tags',
    joinColumn: { name: 'product_id' },
    inverseJoinColumn: { name: 'tag_id' },
  })
  tags: TagEntity[];

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;
}
