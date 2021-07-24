import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthStrategy } from '../auth/strategies/jwt-auth.strategy';
import { SharedModule } from '../shared/shared.module';
import { UserRepository } from './repositories/user.repository';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';
import { UserAclService } from './services/user-acl.service';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService, JwtAuthStrategy, UserAclService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
