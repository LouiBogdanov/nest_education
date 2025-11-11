import { Injectable } from '@nestjs/common';
import { CreateDocumentsAltDto } from './dto/create-documents-alt.dto';
import { UpdateDocumentsAltDto } from './dto/update-documents-alt.dto';
import { documents } from './mocks/document-mock';

@Injectable()
export class DocumentsAltService {
  create(createDocumentsAltDto: CreateDocumentsAltDto) {
    return 'This action adds a new documentsAlt';
  }

  async findAll() {
    const documentsList = await documents;

    return documentsList;
  }

  async findOne(id: number) {
    const document = await documents[id];
    return document;
  }

  update(id: number, updateDocumentsAltDto: UpdateDocumentsAltDto) {
    return `This action updates a #${id} documentsAlt`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentsAlt`;
  }
}
