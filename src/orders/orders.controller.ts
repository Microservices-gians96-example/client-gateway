import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto);
  }

  @Get()
  async findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    // return orderPaginationDto
    try {
      const orders = await firstValueFrom(this.client.send('findAllOrders', orderPaginationDto));

      return orders
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.client.send('findOneOrder', { id });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':status')
  findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {
    try {
      // return { statusDto, paginationDto }
      return this.client.send('findAllOrders', { status: statusDto.status, ...paginationDto });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    // return { id, ...statusDto }
    try {

      return this.client.send('changeOrderStatus', { id, ...statusDto });
    } catch (error) {
      throw new RpcException(error);
    }
  }

}