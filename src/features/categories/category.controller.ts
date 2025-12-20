import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ExludeTitleValidationPipe } from 'src/shared/pipes/exlude-title.pipe';

import { CategoryService } from './category.service';
import { AddCategoryDto } from './dto/add-category.dto';

@Controller('categories')
export class CategoryController {
  logger = new Logger(CategoryController.name);

  constructor(private readonly categoryService: CategoryService) {}

  @Post('/')
  addCategory(@Body() categoryDto: AddCategoryDto) {
    return this.categoryService.addCategory(categoryDto);
  }

  @Post('/:id')
  getCategory(
    @Param('id') id: number,
    @Body(new ExludeTitleValidationPipe()) inputDto: AddCategoryDto,
  ) {
    this.logger.log(typeof id);
    this.logger.log(inputDto);
  }
}
