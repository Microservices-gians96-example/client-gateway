import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";

export class StatusDto {
    @IsOptional()
    @IsEnum(OrderStatusList, {
        message: 'El estatus debe ser uno de los siguientes: ' + OrderStatusList.join(', ')
    })
    status: OrderStatus
}