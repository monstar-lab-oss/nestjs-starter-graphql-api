import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthStrategy } from '../auth/strategies/jwt-auth.strategy';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { ArticleRepository } from './repositories/article.repository';
import { ArticleResolver } from './resolvers/article.resolver';
import { ArticleService } from './services/article.service';
import { ArticleAclService } from './services/article-acl.service';

@Module({
  imports: [
    UserModule,
    SharedModule,
    TypeOrmModule.forFeature([ArticleRepository]),
  ],
  providers: [
    ArticleService,
    ArticleResolver,
    ArticleAclService,
    JwtAuthStrategy,
  ],
  exports: [ArticleService],
})
export class ArticleModule {}
