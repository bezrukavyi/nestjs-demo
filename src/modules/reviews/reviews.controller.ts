import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { Body, Param, Query } from '@nestjs/common';
import { CreateReviewDto, ReviewFieldsDto, UpdateReviewDto } from './reviews.dto';
// import { CatchDatabaseValidationError } from 'src/common/decorators/CatchDatabaseValidationError.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
// import { Permissions } from 'src/common/decorators/Permissions.decorator';
import { ReviewsService } from './reviews.service';
// import { Product } from './products.model';
// import { plainToInstance } from 'class-transformer';
// import { ApiTags } from '@nestjs/swagger';
// import {
//   ApiProductOperation,
//   ApiProductsListOperation,
//   ApiProductParam,
//   ApiProductCreateOperation,
//   ApiProductUpdateOperation,
// } from './swagger.decorator';

@Controller('products/:productId/reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Get()
  async index(
    @Param('productId') productId: string,
    @Query() pagination: PaginationDto,
  ): Promise<any> {
    return this.reviewService.search(productId, pagination);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() params: UpdateReviewDto): Promise<any> {
    return this.reviewService.update(id, params);
  }

  @Post()
  async create(
    @Param('productId') productId: string,
    @Body() params: ReviewFieldsDto,
  ): Promise<any> {
    const paramsWithProductId = { ...params, productId };
    return this.reviewService.create(paramsWithProductId);
  }

  @Delete('id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.reviewService.deleteById(id);
  }
}
