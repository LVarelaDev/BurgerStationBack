import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
} from 'class-validator';
import {
  DocumentType,
  DOCUMENT_TYPES,
} from '../constants/document-types.const';

export class CreateUserDto {
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
    minLength: 2,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder los 100 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  name: string;

  @ApiProperty({
    enum: DOCUMENT_TYPES,
    example: 'CC',
    description: 'Tipo de documento de identidad',
  })
  @IsEnum(DOCUMENT_TYPES, { message: 'Tipo de documento inválido' })
  typeDocument: DocumentType;

  @ApiProperty({
    example: '123456789',
    description: 'Número de documento',
    minLength: 5,
    maxLength: 20,
  })
  @IsNotEmpty({ message: 'El documento es requerido' })
  @IsString()
  @MinLength(5, { message: 'El documento debe tener al menos 5 caracteres' })
  @MaxLength(20, { message: 'El documento no puede exceder los 20 caracteres' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'El documento solo puede contener letras y números',
  })
  document: string;

  @ApiProperty({
    example: 'Calle 123 #45-67',
    description: 'Dirección del usuario',
    minLength: 5,
  })
  @IsNotEmpty({ message: 'La dirección es requerida' })
  @IsString()
  @MinLength(5, { message: 'La dirección debe tener al menos 5 caracteres' })
  address: string;

  @ApiProperty({
    example: '+573001234567',
    description: 'Número de teléfono',
    minLength: 7,
    maxLength: 15,
  })
  @IsNotEmpty({ message: 'El teléfono es requerido' })
  @IsString()
  @MinLength(7, { message: 'El teléfono debe tener al menos 7 caracteres' })
  @MaxLength(15, { message: 'El teléfono no puede exceder los 15 caracteres' })
  @Matches(/^[0-9+]+$/, {
    message: 'El teléfono solo puede contener números y el signo +',
  })
  phone: string;

  @ApiProperty({
    example: 'usuario@ejemplo.com',
    description: 'Correo electrónico del usuario',
  })
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  @MaxLength(100, { message: 'El email no puede exceder los 100 caracteres' })
  email: string;

  @ApiProperty({
    example: 'PasswordSeguro123!',
    description: 'Contraseña del usuario',
    minLength: 8,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(50, {
    message: 'La contraseña no puede exceder los 50 caracteres',
  })
  @Matches(/[A-Z]/, {
    message: 'La contraseña debe contener al menos una mayúscula',
  })
  @Matches(/[a-z]/, {
    message: 'La contraseña debe contener al menos una minúscula',
  })
  @Matches(/[0-9]/, {
    message: 'La contraseña debe contener al menos un número',
  })
  @Matches(/[^A-Za-z0-9]/, {
    message: 'La contraseña debe contener al menos un carácter especial',
  })
  password: string;
}
