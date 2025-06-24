import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsArray,
  ValidateNested,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemCustomizationDto } from './create-order-item-customization.dto';

export class CreateOrderItemDto {
  @ApiProperty({
    example: 1,
    description: 'ID de la hamburguesa',
  })
  @IsNumber()
  @IsPositive()
  burgerId: number;

  @ApiProperty({
    example: 1,
    description: 'Cantidad',
    minimum: 1,
  })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    example: 9.5,
    description: 'Precio base de la hamburguesa',
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    type: [CreateOrderItemCustomizationDto],
    description: 'Personalizaciones (máx 5: 3 adiciones + 2 salsas)',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemCustomizationDto)
  customizations: CreateOrderItemCustomizationDto[];
}
