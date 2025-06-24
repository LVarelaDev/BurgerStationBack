import { ApiProperty } from '@nestjs/swagger';
import { DocumentType } from '../constants/document-types.const';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Juan Pérez' })
  name: string;

  @ApiProperty({ enum: ['CC', 'CE', 'NIT'], example: 'CC' })
  typeDocument: DocumentType;

  @ApiProperty({ example: '123456789' })
  document: string;

  @ApiProperty({ example: 'Calle 123 #45-67' })
  address: string;

  @ApiProperty({ example: '+573001234567' })
  phone: string;

  @ApiProperty({ example: 'usuario@ejemplo.com' })
  email: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
