import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { ORDER_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    // return orderPaginationDto
    return this.ordersClient.send('findAllOrders', orderPaginationDto);
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.ordersClient.send('findOneOrder', { id });
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
      return this.ordersClient.send('findAllOrders', { status: statusDto.status, ...paginationDto });
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

      return this.ordersClient.send('changeOrderStatus', { id, ...statusDto });
    } catch (error) {
      throw new RpcException(error);
    }
  }

}