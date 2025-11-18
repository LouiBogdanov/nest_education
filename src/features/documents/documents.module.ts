import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { DocumentsAltModule } from '../documents-alt/documents-alt.module';

@Module({
  imports: [DocumentsAltModule],
  controllers: [DocumentsController],
  providers: [DocumentsService,],
})
export class DocumentsModule {}
