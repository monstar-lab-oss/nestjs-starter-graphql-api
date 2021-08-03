import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { RequestContext } from './request-context.dto';
import { createRequestContext } from './util';

export const ReqContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RequestContext => {
    const { req } = GqlExecutionContext.create(ctx).getContext();
    return createRequestContext(req);
  },
);
