import { ApiProperty } from '@nestjs/swagger';
import { LoginRequestDto } from 'src/modules/auth/application/dto/login-request.dto';

export class LoginRequestExample implements LoginRequestDto {
  @ApiProperty({
    example: 'usuario@ejemplo.com',
    description: 'Correo electrónico del usuario',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: 'PasswordSeguro123!',
    description: 'Contraseña del usuario',
    required: true,
    minLength: 8,
  })
  password: string;
}

export const LoginRequestExampleSchema = {
  user: {
    summary: 'Usuario',
    value: {
      email: 'usuario@ejemplo.com',
      password: 'password123',
    },
  },
};
