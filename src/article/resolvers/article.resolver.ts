import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { ArticleOutput } from '../dtos/article-output.dto';
import { ArticleService } from '../services/article.service';
import { ReqContext } from './../../shared/request-context/req-context.decorator';
import { RequestContext } from './../../shared/request-context/request-context.dto';

@Resolver()
export class ArticleResolver {
  constructor(private articleService: ArticleService) {}

  @Query((returns) => ArticleOutput, { name: 'article' })
  async getArticle(
    @ReqContext() ctx: RequestContext,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return await this.articleService.getArticleById(ctx, id);
  }
}
