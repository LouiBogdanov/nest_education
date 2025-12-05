import { PartialType } from '@nestjs/mapped-types';

import { CreateCategoryDto } from './create-document.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
