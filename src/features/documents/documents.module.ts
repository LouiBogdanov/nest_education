import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { DocumentsAltService } from '../documents-alt/documents-alt.service';

@Module({
  imports: [DocumentsAltService],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
