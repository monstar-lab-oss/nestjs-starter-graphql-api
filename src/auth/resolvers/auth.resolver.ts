import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { LoginInput } from '../dtos/auth-login-input.dto';
import { RegisterInput } from '../dtos/auth-register-input.dto';
import { RegisterOutput } from '../dtos/auth-register-output.dto';
import { AuthTokenOutput } from '../dtos/auth-token-output.dto';
import { AuthService } from '../services/auth.service';
import { AppLogger } from './../../shared/logger/logger.service';
import { ReqContext } from './../../shared/request-context/req-context.decorator';
import { RequestContext } from './../../shared/request-context/request-context.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService, private logger: AppLogger) {}

  @Mutation((returns) => RegisterOutput, {
    name: 'register',
  })
  async registerLocal(
    @ReqContext() ctx: RequestContext,
    @Args('input') input: RegisterInput,
  ): Promise<RegisterOutput> {
    this.logger.log(ctx, `${this.registerLocal.name} was called`);

    return await this.authService.register(ctx, input);
  }

  @Mutation((returns) => AuthTokenOutput, {
    name: 'login',
  })
  async login(
    @ReqContext() ctx: RequestContext,
    @Args('credential') credential: LoginInput,
  ): Promise<AuthTokenOutput> {
    this.logger.log(ctx, `${this.login.name} was called`);

    return this.authService.login(ctx, credential);
  }

  @Mutation((returns) => AuthTokenOutput, {
    name: 'refreshToken',
  })
  async refreshToken(
    @ReqContext() ctx: RequestContext,
    @Args('refreshToken', { type: () => String }) refreshToken: string,
  ): Promise<AuthTokenOutput> {
    this.logger.log(ctx, `${this.refreshToken.name} was called`);

    return await this.authService.refreshToken(ctx, refreshToken);
  }
}
