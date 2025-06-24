import { ApiProperty } from '@nestjs/swagger';

export class BurgerResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'La Montañesa' })
  name: string;

  @ApiProperty({ example: 'Carne de res artesanal, queso suizo...' })
  description: string;

  @ApiProperty({ example: 9.5 })
  price: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
