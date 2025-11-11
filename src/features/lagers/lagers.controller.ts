import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LagersService } from './lagers.service';
import { CreateLagerDto } from './dto/create-lager.dto';
import { UpdateLagerDto } from './dto/update-lager.dto';

@Controller('lagers')
export class LagersController {
  constructor(private readonly lagersService: LagersService) {}

  @Post()
  create(@Body() createLagerDto: CreateLagerDto) {
    return this.lagersService.create(createLagerDto);
  }

  @Get()
  findAll() {
    return this.lagersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lagersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLagerDto: UpdateLagerDto) {
    return this.lagersService.update(+id, updateLagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lagersService.remove(+id);
  }
}
