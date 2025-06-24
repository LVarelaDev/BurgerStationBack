import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsArray,
  ValidateNested,
  IsString,
  IsOptional,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create-order-item.dto';

const validStatuses = ['PENDING', 'IN PROCESS', 'COMPLETED'];

export class CreateOrderDto {
  @ApiProperty({
    example: 1,
    description: 'ID del usuario que realiza el pedido',
  })
  @IsNumber()
  @IsPositive()
  userId: number;

  @ApiProperty({
    example: 25.5,
    description: 'Total del pedido',
  })
  @IsNumber()
  @IsPositive()
  total: number;

  @ApiProperty({
    example: 'PENDING',
    description: 'Estado del pedido',
    enum: validStatuses,
  })
  @IsIn(validStatuses, { message: 'Estado no válido' })
  status: 'PENDING' | 'IN PROCESS' | 'COMPLETED';

  @ApiProperty({
    required: false,
    example: 'Sin cebolla para la hamburguesa 1',
    description: 'Notas especiales para el pedido',
  })
  @IsOptional()
  @IsString()
  customerNote?: string;

  @ApiProperty({
    type: [CreateOrderItemDto],
    description: 'Items del pedido',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
