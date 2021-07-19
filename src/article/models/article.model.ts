import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
// import { Author } from './author.model';

@ObjectType()
export class ArticleModel {
  @Expose()
  @Field((type) => Int)
  id: number;

  @Expose()
  @Field({ nullable: true })
  title: string;

  @Expose()
  @Field({ nullable: true })
  post: string;

  @Expose()
  @Field({ nullable: true })
  createdAt: Date;

  @Expose()
  @Field({ nullable: true })
  updatedAt: Date;

  // @Field()
  // author: Author;
}
