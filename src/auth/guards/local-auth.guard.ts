import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { STRATEGY_LOCAL } from '../constants/strategy.constant';

@Injectable()
export class LocalAuthGuard extends AuthGuard(STRATEGY_LOCAL) {
  getRequest(ctx: ExecutionContext): any {
    const context = GqlExecutionContext.create(ctx).getContext();
    return context.req;
  }
}
