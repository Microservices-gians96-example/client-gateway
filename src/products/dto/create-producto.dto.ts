import { Type } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";

export class CreateProductoDto {
    @IsString()
    public name: string;

    @IsNumber({
        maxDecimalPlaces: 2,

    })
    @Min(0)
    @Type(() => Number)
    public price: number;
}
