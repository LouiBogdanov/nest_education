import {
  Controller,
  Get,
  Logger,
  Param,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ClientInfo } from 'src/shared/decorators/client-info.decorator';
import { IncludePrefixIdPipe } from 'src/shared/pipes/include-prefix-id.pipe';

import { LifecycleFilter } from './filters/lifecycle.filter';
import { LifecycleGuard } from './guards/lifecycle.guard';
import { LifecycleInterceptor } from './interceptors/lifecycle.interseptor';
import { LifecycleService } from './lifecycle.service';
import { LifecyclePipe } from './pipes/lifecycle.pipe';

@UseGuards(LifecycleGuard)
@Controller('lifecycle')
export class LifecycleController {
  logger = new Logger(LifecycleController.name);
  constructor(private readonly lifecycleService: LifecycleService) {}

  @UseFilters(LifecycleFilter)
  // @UsePipes()
  @Get(':id')
  getLifecycle(
    @Param('id', LifecyclePipe, IncludePrefixIdPipe) id: string,
    @ClientInfo() info,
  ) {
    this.logger.debug('5.Controller');
    return this.lifecycleService.run(id, info);
  }

  @Get()
  get() {
    return { ping: 'pong' };
  }
}
