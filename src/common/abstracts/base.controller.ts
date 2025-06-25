import { Controller } from '@nestjs/common';

@Controller()
export abstract class BaseController {
  protected getUserIdFromRequest(request: any): number {
    return request.user?.sub;
  }
}
