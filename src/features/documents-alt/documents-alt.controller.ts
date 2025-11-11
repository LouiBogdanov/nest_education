import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentsAltService } from './documents-alt.service';
import { CreateDocumentsAltDto } from './dto/create-documents-alt.dto';
import { UpdateDocumentsAltDto } from './dto/update-documents-alt.dto';

@Controller('documents-alt')
export class DocumentsAltController {
  constructor(private readonly documentsAltService: DocumentsAltService) {}

  @Post()
  create(@Body() createDocumentsAltDto: CreateDocumentsAltDto) {
    return this.documentsAltService.create(createDocumentsAltDto);
  }

  @Get()
  findAll() {
    return this.documentsAltService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsAltService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentsAltDto: UpdateDocumentsAltDto) {
    return this.documentsAltService.update(+id, updateDocumentsAltDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentsAltService.remove(+id);
  }
}
