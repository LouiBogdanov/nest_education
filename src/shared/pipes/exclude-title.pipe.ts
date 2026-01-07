import { AddCategoryDto } from '@features/categories/dto/add-category.dto';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

const excludesWord = ['cat'];

@Injectable()
export class ExludeTitleValidationPipe implements PipeTransform {
  words = excludesWord;

  transform(value: AddCategoryDto) {
    this.words.map((item) => {
      if (value.title.includes(item)) {
        throw new BadRequestException('Title not valid.');
      }
    });

    return value;
  }
}
