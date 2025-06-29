import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator((ctx: ExecutionContext): number => {
  const request = ctx.switchToHttp().getRequest();
  return request.user?.sub;
});
