// src/common/interceptors/api-response.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiGenericResponse } from '../responses/api-generic-response';

@Injectable()
export class ApiResponseInterceptor<T>
  implements NestInterceptor<T, ApiGenericResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiGenericResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof ApiGenericResponse) {
          return data;
        }

        return ApiGenericResponse.success('Operación exitosa', data);
      }),
    );
  }
}
