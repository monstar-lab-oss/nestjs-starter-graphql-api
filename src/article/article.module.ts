import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthStrategy } from '../auth/strategies/jwt-auth.strategy';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { ArticleRepository } from './repositories/article.repository';
import { ArticleService } from './services/article.service';
import { ArticleAclService } from './services/article-acl.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([ArticleRepository]),
    UserModule,
  ],
  providers: [ArticleService, JwtAuthStrategy, ArticleAclService],
  exports: [ArticleService],
})
export class ArticleModule {}
