import {
  Body,
  Controller,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { LoginRequestDto } from '../../application/dto/login-request.dto';
import { LoginResponseDto } from '../../application/dto/login-response.dto';
import { UserResponseDto } from '../../application/dto/user-response.dto';
import { AuthService } from '../../application/services/auth.service';
import {
  LoginRequestExample,
  LoginRequestExampleSchema,
} from './examples/LoginRequestExample';
import {
  LoginResponseExample,
  LoginResponseExampleSchema,
} from './examples/LoginResponseExample';

@ApiTags('Authentication')
@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'Autentica un usuario y devuelve un token JWT',
  })
  @ApiBody({
    type: LoginRequestExample,
    examples: LoginRequestExampleSchema,
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginResponseExample,
    schema: {
      example: LoginResponseExampleSchema,
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'email must be an email',
          'password must be at least 8 characters',
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
    schema: {
      example: {
        statusCode: 401,
        message: 'Invalid credentials',
        error: 'Unauthorized',
      },
    },
  })
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    console.log('body', body);
    return await this.authService.login(body);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      normalUser: {
        summary: 'Usuario normal',
        value: {
          name: 'Juan Pérez',
          typeDocument: 'CC',
          document: '123456789',
          address: 'Calle 123 #45-67',
          phone: '+573001234567',
          email: 'usuario@ejemplo.com',
          password: 'PasswordSeguro123!',
        },
      },
      businessUser: {
        summary: 'Usuario empresarial',
        value: {
          name: 'Mi Empresa SAS',
          typeDocument: 'NIT',
          document: '901234567-1',
          address: 'Carrera 100 #25-30',
          phone: '+5712345678',
          email: 'empresa@ejemplo.com',
          password: 'EmpresaPassword123!',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'email must be an email',
          'password must be at least 8 characters',
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict (email already exists or invalid NIT)',
    schema: {
      example: {
        statusCode: 409,
        message: 'El email ya está registrado',
        error: 'Conflict',
      },
    },
  })
  @UsePipes(new ValidationPipe())
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.authService.create(createUserDto);
  }
}
