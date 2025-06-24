import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiGenericResponse } from '../responses/api-generic-response';

export const ApiResponseDecorator = <TModel extends Type<any>>(
  status: number,
  description: string,
  model?: TModel,
) => {
  if (!model) {
    return applyDecorators(
      ApiResponse({ status, description, type: ApiGenericResponse }),
    );
  }

  return applyDecorators(
    ApiExtraModels(ApiGenericResponse, model),
    ApiResponse({
      status,
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiGenericResponse) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};
