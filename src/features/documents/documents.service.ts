import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { documents } from './mocks/document-mock';
import { DocumentsAltService } from '../documents-alt/documents-alt.service';

@Injectable()
export class DocumentsService {
  constructor(
    private documentsAlt: DocumentsAltService
  ) {

  }
  create(createDocumentDto: CreateDocumentDto) {
    
    return 'This action adds a new document';
  }

  async findAll() {
    // const documentsList = await documents;
    const documentsList = await this.documentsAlt.findAll();

    return documentsList;
  }

  async findOne(id: number) {
    const document = await documents[id];
    return document;
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${id} document`;
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }
}
