import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentsAltDto } from './create-documents-alt.dto';

export class UpdateDocumentsAltDto extends PartialType(CreateDocumentsAltDto) {}
