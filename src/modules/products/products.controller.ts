import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { CatchDatabaseValidationError } from 'src/common/decorators/CatchDatabaseValidationError.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Permissions } from 'src/common/decorators/Permissions.decorator';
import { ProductWithPaginationDto, CreateProductDto, UpdateProductDto } from './products.dto';
import { ProductsService } from './products.service';
import { Product } from './products.model';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';
import { ProductDto } from './products.dto';
import {
  ApiProductOperation,
  ApiProductsListOperation,
  ApiProductParam,
  ApiProductCreateOperation,
  ApiProductUpdateOperation,
} from './swagger.decorator';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Permissions('readOnly')
  @ApiProductsListOperation('List all products', 'Retrieves a list of all products', ProductDto)
  async index(@Query() pagination: PaginationDto): Promise<ProductWithPaginationDto> {
    const products = await this.productsService.search(pagination);
    const productsCount = await this.productsService.count();

    return {
      products: products.map((product) => this.serialize(product)),
      pagination: {
        ...pagination,
        totalCount: productsCount,
      },
    };
  }

  @Get(':id')
  @Permissions('readOnly')
  @ApiProductOperation('Get a product by ID', 'Retrieves a product by its ID', ProductDto)
  @ApiProductParam()
  async show(@Param('id', ParseIntPipe) id: string): Promise<ProductDto> {
    return this.serialize(await this.productsService.find(id));
  }

  @Post()
  @Permissions('readWrite')
  @CatchDatabaseValidationError()
  @ApiProductCreateOperation()
  async create(@Body() params: CreateProductDto): Promise<ProductDto> {
    return this.serialize(await this.productsService.create(params));
  }

  @Patch(':id')
  @Permissions('readWrite')
  @CatchDatabaseValidationError()
  @ApiProductUpdateOperation()
  async update(@Param('id') id: string, @Body() params: UpdateProductDto): Promise<ProductDto> {
    return this.serialize(await this.productsService.update(id, params));
  }

  @Delete(':id')
  @Permissions('readWrite')
  @ApiProductOperation('Delete a product by ID', 'Deletes a product by its ID', Boolean)
  @ApiProductParam()
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.productsService.delete(id);
  }

  private serialize(product: Product) {
    return plainToInstance(ProductDto, product, {
      excludeExtraneousValues: true,
    });
  }
}
