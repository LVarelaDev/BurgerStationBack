import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiGenericResponse } from '../responses/api-generic-response';

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(ApiGenericResponse.error(message), HttpStatus.NOT_FOUND);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string, errors?: any) {
    super(
      ApiGenericResponse.error(message, { errors }),
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(ApiGenericResponse.error(message), HttpStatus.UNAUTHORIZED);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string) {
    super(ApiGenericResponse.error(message), HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class ConflictException extends HttpException {
  constructor(message: string) {
    super(ApiGenericResponse.error(message), HttpStatus.CONFLICT);
  }
}
