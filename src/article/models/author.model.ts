import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class AuthorModel {
  @Expose()
  @Field((type) => Int)
  id: number;

  @Expose()
  @Field()
  name: string;

  @Expose()
  @Field()
  username: string;

  @Expose()
  @Field()
  email: string;
}
