import { Injectable } from '@nestjs/common';
import { CreateLagerDto } from './dto/create-lager.dto';
import { UpdateLagerDto } from './dto/update-lager.dto';

@Injectable()
export class LagersService {
  create(createLagerDto: CreateLagerDto) {
    return 'This action adds a new lager';
  }

  findAll() {
    return `This action returns all lagers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lager`;
  }

  update(id: number, updateLagerDto: UpdateLagerDto) {
    return `This action updates a #${id} lager`;
  }

  remove(id: number) {
    return `This action removes a #${id} lager`;
  }
}
