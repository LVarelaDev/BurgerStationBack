import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiGenericResponse } from '../responses/api-generic-response';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    let message = 'Error interno del servidor';
    let responseData: ApiGenericResponse<any>;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (exceptionResponse instanceof ApiGenericResponse) {
        responseData = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        responseData = ApiGenericResponse.error(
          exceptionResponse['message'] || message,
          exceptionResponse,
        );
      } else {
        responseData = ApiGenericResponse.error(exceptionResponse.toString());
      }
    } else if (exception instanceof Error) {
      responseData = ApiGenericResponse.error(exception.message);
    } else {
      responseData = ApiGenericResponse.error(message);
    }

    response.status(status).json({
      ...responseData,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
