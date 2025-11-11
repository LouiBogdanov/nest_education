import { Module } from '@nestjs/common';
import { DocumentsAltService } from './documents-alt.service';
import { DocumentsAltController } from './documents-alt.controller';

@Module({
  controllers: [DocumentsAltController],
  providers: [DocumentsAltService],
  exports: [DocumentsAltService]
})
export class DocumentsAltModule {}
