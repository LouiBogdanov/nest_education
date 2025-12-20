import {
  CategoryEntity,
  ProductEntity,
  TagEntity,
} from '@features/all-entities';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOneOptions, In, Repository } from 'typeorm';

import { AddProductDto } from './dto/add-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,

    private readonly dataSource: DataSource,
  ) {}

  async getProductByTitle(productTitle: string): Promise<ProductEntity | null> {
    const findOptions: FindOneOptions<ProductEntity> = {
      where: {
        title: productTitle.toLowerCase(),
      },
    };
    const product = await this.productRepository.findOne(findOptions);
    return product || null;
  }

  async addProduct(dto: AddProductDto) {
    return this.dataSource.transaction(async (manager) => {
      const existProduct = await this.getProductByTitle(dto.title);
      if (existProduct) {
        throw new ConflictException('Product already exists');
      }

      const category = await manager.findOne(CategoryEntity, {
        where: { id: dto.categoryId, isActive: true },
      });

      if (!category) {
        throw new NotFoundException('Category not found or inactive');
      }

      let tags: TagEntity[] = [];

      if (dto.tagIds?.length) {
        tags = await manager.find(TagEntity, {
          where: { id: In(dto.tagIds) },
        });

        if (tags.length !== dto.tagIds.length) {
          throw new BadRequestException('One or more tags not found');
        }
      }

      const product = manager.create(ProductEntity, {
        title: dto.title,
        price: dto.price,
        categoryId: category.id,
        category,
        tags,
      });

      return manager.save(product);
    });
  }
}
