import { CanActivate, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LifecycleGuard implements CanActivate {
  logger = new Logger(LifecycleGuard.name);

  canActivate(): boolean {
    this.logger.debug('2.Guard');
    return true;
  }
}
