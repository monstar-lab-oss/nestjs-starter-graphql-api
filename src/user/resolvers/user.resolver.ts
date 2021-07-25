import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { UserOutput } from '../dtos/user-output.dto';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { AppLogger } from './../../shared/logger/logger.service';
import { ReqContext } from './../../shared/request-context/req-context.decorator';
import { RequestContext } from './../../shared/request-context/request-context.dto';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService, private logger: AppLogger) {}

  @Query((returns) => UserOutput, {
    name: 'me',
  })
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@ReqContext() ctx: RequestContext): Promise<UserOutput> {
    this.logger.log(ctx, `${this.getMyProfile.name} was called`);

    return await this.userService.findById(ctx, ctx.user.id);
  }
}
