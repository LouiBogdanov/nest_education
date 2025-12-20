import { Body, Controller, Post } from '@nestjs/common';

import { AddTagDto } from './dto/add-tag.dto';
import { TagEntity } from './entities/tag.entity';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  addTag(@Body() input: AddTagDto): Promise<TagEntity> {
    return this.tagService.addTag(input);
  }
}
