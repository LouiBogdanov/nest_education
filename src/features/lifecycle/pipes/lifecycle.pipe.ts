import {
  ArgumentMetadata,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class LifecyclePipe implements PipeTransform {
  logger = new Logger(LifecyclePipe.name);
  transform(value: unknown, metadata: ArgumentMetadata) {
    this.logger.debug('4.Pipe');
    return value;
  }
}
