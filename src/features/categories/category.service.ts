import { CategoryEntity } from '@features/all-entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private dataSource: DataSource,
  ) {}

  // async findAll(): Promise<CategoryEntity[]> {
  //   return this.dataSource.transaction((manager) => {
  //     return manager.getRepository(CategoryEntity).find();
  //   });
  // }
}
