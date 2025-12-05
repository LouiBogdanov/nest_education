import { Body, Controller, Post } from '@nestjs/common';

import { CategoryService } from './category.service';
import { AddCategoryDto } from './dto/add-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  addCategory(@Body() categoryDto: AddCategoryDto) {
    return this.categoryService.addCategory(categoryDto);
  }
}
