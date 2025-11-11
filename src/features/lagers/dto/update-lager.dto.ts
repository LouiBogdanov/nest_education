import { PartialType } from '@nestjs/mapped-types';
import { CreateLagerDto } from './create-lager.dto';

export class UpdateLagerDto extends PartialType(CreateLagerDto) {}
