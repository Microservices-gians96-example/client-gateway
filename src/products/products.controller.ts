import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config/services';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy) {
  }

  @Post()
  createProduct(@Body() createProductoDto: CreateProductoDto) {
    return this.productClient.send({ cmd: 'create_producto' }, createProductoDto);
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productClient.send({ cmd: 'find_all_productos' }, paginationDto);
  }

  @Get(':id')
  async findOneProduct(@Param('id', ParseIntPipe) id: number) {
    //usando el observable
    return await firstValueFrom(this.productClient.send({ cmd: 'find_one_producto' }, { id })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        })
      )
    )


    // con promesas
    try {
      return await firstValueFrom(this.productClient.send({ cmd: 'find_one_producto' }, { id }))
    } catch (error) {
      throw new RpcException(error);
    }

  }
  
  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productClient.send({ cmd: 'delete_producto' }, { id })
    .pipe(catchError(err => { throw new RpcException(err) }));

  }

  @Patch(':id')
  updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productClient.send({ cmd: 'update_producto' }, { id, ...updateProductoDto })
    // .pipe(catchError(err => { throw new RpcException(err) }));

  }

}
