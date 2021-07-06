import { Expose, Type } from 'class-transformer';

import { AuthorOutput } from './author-output.dto';

export class ArticleOutput {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  post: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => AuthorOutput)
  author: AuthorOutput;
}
