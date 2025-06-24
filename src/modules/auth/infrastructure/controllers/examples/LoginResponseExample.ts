import { ApiProperty } from '@nestjs/swagger';
import { LoginResponseDto } from 'src/modules/auth/application/dto/login-response.dto';

export class LoginResponseExample implements LoginResponseDto {
  @ApiProperty({
    example: {
      id: 1221,
      name: 'Juan Pérez',
      email: 'usuario@ejemplo.com',
      typeDocument: 'CC',
      document: '1234567890',
      address: 'Calle 123 #45-67',
      phone: '+573001234567',
    },
    description: 'Información del usuario autenticado',
  })
  user: any;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Token de acceso JWT',
  })
  token: string;
}

export const LoginResponseExampleSchema = {
  user: {
    id: 1221,
    name: 'Juan Pérez',
    email: 'usuario@ejemplo.com',
    typeDocument: 'CC',
    document: '1234567890',
    address: 'Calle 123 #45-67',
    phone: '+573001234567',
  },
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
};
