import { CategoryEntity } from '@features/all-entities';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';

import { AddCategoryDto } from './dto/add-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getCategoryByTitle(
    categoryTitle: string,
  ): Promise<CategoryEntity | null> {
    const findOptions: FindOneOptions<CategoryEntity> = {
      where: {
        title: categoryTitle.toLowerCase(),
      },
    };
    const category = await this.categoryRepository.findOne(findOptions);
    return category || null;
  }

  async addCategory(category: AddCategoryDto): Promise<CategoryEntity> {
    const existCategory = await this.getCategoryByTitle(category.title);
    if (existCategory) {
      throw new ConflictException('Category already exists');
    }
    const categoryOptions: DeepPartial<CategoryEntity> = {
      ...category,
      title: category.title.toLowerCase(),
    };
    const dbCategory = this.categoryRepository.create(categoryOptions);

    return this.categoryRepository.save(dbCategory);
  }
}
