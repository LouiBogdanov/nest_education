export class AddProductDto {
  title: string;
  price: number;
  categoryId: number;

  // @IsOptional()
  // @IsArray()
  // @ArrayUnique()
  // @IsInt({ each: true })
  tagIds?: number[];
}
