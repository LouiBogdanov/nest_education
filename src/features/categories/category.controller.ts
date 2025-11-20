import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-document.dto';
import { UpdateCategoryDto } from './dto/update-document.dto';

@Controller('documents')
export class CategoryController {
  constructor(private readonly documentsAltService: CategoryService) {}

  @Post()
  create(@Body() createDocumentsDto: CreateCategoryDto) {
    return this.documentsAltService.create(createDocumentsDto);
  }

  @Get()
  findAll() {
    return this.documentsAltService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsAltService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentsAltDto: UpdateCategoryDto,
  ) {
    return this.documentsAltService.update(+id, updateDocumentsAltDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentsAltService.remove(+id);
  }
}
