import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config/services';

@Controller('products')
export class ProductsController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy) {

  }

  @Post()
  createProduct() {
    return 'createProduct';
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productClient.send({ cmd: 'find_all_productos' }, paginationDto);
  }

  @Get(':id')
  findOneProduct(@Param('id',ParseIntPipe) id: number) {
    return this.productClient.send({ cmd: 'find_one_producto' }, {id});

  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return 'deleteProductById' + id;
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() body) {
    return 'updateProductById' + id + body;
  }

}
