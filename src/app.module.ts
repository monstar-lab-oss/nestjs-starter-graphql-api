import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ArticleModule,
    SharedModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      include: [ArticleModule, AuthModule, UserModule],
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
