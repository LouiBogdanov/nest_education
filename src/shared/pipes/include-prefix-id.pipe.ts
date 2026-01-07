import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

export const ID_PREFIX = '0q-';

@Injectable()
export class IncludePrefixIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.data === 'id') {
      if (!value.startsWith(ID_PREFIX)) {
        throw new BadRequestException(`ID must have prefix: ${ID_PREFIX}`);
      }
    }
    return value;
  }
}
