import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsIn } from 'class-validator';

export class CreateOrderItemCustomizationDto {
  @ApiProperty({
    example: 1,
    description: 'ID de la opción de personalización',
  })
  @IsNumber()
  @IsPositive()
  customizationOptionId: number;

  @ApiProperty({
    example: 1.0,
    description: 'Precio del adicional',
  })
  @IsNumber()
  price: number;
}
