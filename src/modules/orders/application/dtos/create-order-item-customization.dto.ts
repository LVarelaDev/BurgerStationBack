import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsIn } from 'class-validator';

const validCustomizationOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // IDs de las opciones válidas

export class CreateOrderItemCustomizationDto {
  @ApiProperty({
    example: 1,
    description: 'ID de la opción de personalización',
  })
  @IsNumber()
  @IsPositive()
  @IsIn(validCustomizationOptions, {
    message: 'Opción de personalización no válida',
  })
  customizationOptionId: number;

  @ApiProperty({
    example: 1.0,
    description: 'Precio del adicional',
  })
  @IsNumber()
  @IsPositive()
  price: number;
}
