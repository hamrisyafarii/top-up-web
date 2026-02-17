import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Auth } from '../entities/auth.entity';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): Auth => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const request = ctx.switchToHttp().getRequest();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return request.user as Auth;
});
