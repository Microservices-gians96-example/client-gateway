import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";

export class OrderPaginationDto extends PaginationDto {
    @IsOptional()
    @IsEnum(OrderStatusList,{
        message: 'El estatus debe ser uno de los siguientes: ' + OrderStatusList.join(', ')
    })
    status?: OrderStatus;
}