import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LifecycleService {
  logger = new Logger(LifecycleService.name);
  run(id: string, info: unknown) {
    this.logger.debug('6.Service');
    if (Math.random() < 0.5) {
      throw new BadRequestException('Random failure');
    }
    return { id, info };
  }
}
