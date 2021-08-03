import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Expose, Type } from 'class-transformer';

import { AuthorOutput } from './author-output.dto';

@ObjectType('Article')
export class ArticleOutput {
  @Expose()
  @Field(() => Int)
  id: number;

  @Expose()
  @Field()
  title: string;

  @Expose()
  @Field()
  post: string;

  @Expose()
  @Field()
  createdAt: Date;

  @Expose()
  @Field()
  updatedAt: Date;

  @Expose()
  @Type(() => AuthorOutput)
  author: AuthorOutput;
}
