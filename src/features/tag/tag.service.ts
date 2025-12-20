import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';

import { AddTagDto } from './dto/add-tag.dto';
import { TagEntity } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async getTagByTitle(tagTitle: string): Promise<TagEntity | null> {
    const findOptions: FindOneOptions<TagEntity> = {
      where: {
        title: tagTitle.toLowerCase(),
      },
    };
    const tag = await this.tagRepository.findOne(findOptions);
    return tag || null;
  }

  async addTag(tag: AddTagDto): Promise<TagEntity> {
    const existCategory = await this.getTagByTitle(tag.title);
    if (existCategory) {
      throw new ConflictException('Tag already exists');
    }
    const categoryOptions: DeepPartial<TagEntity> = {
      ...tag,
      title: tag.title.toLowerCase(),
    };
    const dbCategory = this.tagRepository.create(categoryOptions);

    return this.tagRepository.save(dbCategory);
  }
}
