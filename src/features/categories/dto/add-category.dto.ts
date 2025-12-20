import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class AddCategoryDto {
  @IsString()
  @Length(3, 32)
  title: string;

  @IsString()
  @Length(6, 64)
  @IsOptional()
  description?: string;

  @IsBoolean()
  isActive: boolean;
}
