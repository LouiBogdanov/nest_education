import { Module } from '@nestjs/common';
import { LagersService } from './lagers.service';
import { LagersController } from './lagers.controller';

@Module({
  controllers: [LagersController],
  providers: [LagersService],
})
export class LagersModule {}
