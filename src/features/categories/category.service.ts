import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateCategoryDto } from './dto/create-document.dto';
import { UpdateCategoryDto } from './dto/update-document.dto';
import { CategoryEntity } from './entities/category.entity';
import { category } from './mocks/category.mock';

@Injectable()
export class CategoryService {
  private mockCategory = category;

  constructor() {}

  create(createDocumentsAltDto: CreateCategoryDto): CategoryEntity {
    const documetData: CategoryEntity = {
      ...createDocumentsAltDto,
      id: this.mockCategory.length + 1,
      isCompleate: false,
      createdDate: new Date(),
    };
    this.mockCategory.push(documetData);
    return documetData;
  }

  findAll(): CategoryEntity[] {
    return this.mockCategory;
  }

  findOne(id: number): CategoryEntity {
    const document = this.mockCategory.find((doc) => doc.id === id);
    if (!document) {
      throw new NotFoundException(`Document with id: ${id} does not exist`);
    }
    return document;
  }

  update(id: number, updateDocumentsAltDto: UpdateCategoryDto): CategoryEntity {
    const existDocument = this.findOne(id);

    if (Object.keys(updateDocumentsAltDto).length === 0) {
      throw new BadRequestException(
        'At least one field must be provided for update.',
      );
    }

    existDocument.isCompleate = false;
    Object.assign(existDocument, updateDocumentsAltDto);

    return existDocument;
  }

  remove(id: number): CategoryEntity {
    const documentIndex = this.mockCategory.findIndex((doc) => doc.id === id);

    if (documentIndex === -1) {
      throw new NotFoundException(`Document with id: ${id} does not exist`);
    }

    const removedDocument = this.mockCategory[documentIndex];
    this.mockCategory.splice(documentIndex, 1);
    return removedDocument;
  }
}
