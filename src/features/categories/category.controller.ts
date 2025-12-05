import { Controller } from '@nestjs/common';

import { CategoryService } from './category.service';

@Controller('documents')
export class CategoryController {
  constructor(private readonly documentsAltService: CategoryService) {}
}
