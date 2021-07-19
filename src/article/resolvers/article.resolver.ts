import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ReqContext } from 'src/shared/request-context/req-context.decorator';
import { RequestContext } from 'src/shared/request-context/request-context.dto';

import { ArticleModel } from '../models/article.model';
import { AuthorModel } from '../models/author.model';
import { ArticleService } from '../services/article.service';

@Resolver((of) => ArticleModel)
export class ArticleResolver {
  constructor(private articleService: ArticleService) {}

  @Query((returns) => ArticleModel, { name: 'article' })
  async getArticle(@Args('id', { type: () => Int }) id: number) {
    return await this.articleService.getArticleById(id);
  }

  // @ResolveField('author', (returns) => [Author])
  // async getArticleAuthor(@Parent() article: Article) {
  //   const { authorId } = Article;
  // }
}
