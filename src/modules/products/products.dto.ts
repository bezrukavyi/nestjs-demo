import { IsString, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';
import { PaginationResponseDto } from 'src/common/dto/pagination.dto';

export class ProductFieldsDto {
  @IsString()
  @Expose()
  readonly name: string;

  @IsNumber()
  @Expose()
  readonly price: number;
}

export class ProductDto extends ProductFieldsDto {
  @IsString()
  @Expose()
  readonly id: string;
}

export class CreateProductDto extends ProductFieldsDto {}

export class UpdateProductDto extends ProductFieldsDto {}

export class ProductWithPaginationDto {
  products: ProductDto[];
  pagination: PaginationResponseDto;
}
