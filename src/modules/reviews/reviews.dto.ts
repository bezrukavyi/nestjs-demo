import { IsString, IsDateString } from 'class-validator';
import { Expose } from 'class-transformer';

export class ReviewFieldsDto {
  @Expose()
  @IsString()
  readonly message: string = '';
}

export class ReviewDto extends ReviewFieldsDto {
  @Expose()
  @IsDateString()
  readonly createdAt!: Date; // Definite assignment assertion
}

export class CreateReviewDto extends ReviewFieldsDto {
  @IsString()
  productId!: string;
}

export class UpdateReviewDto extends ReviewFieldsDto {}
