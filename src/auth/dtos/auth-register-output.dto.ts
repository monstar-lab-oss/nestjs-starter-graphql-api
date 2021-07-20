import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

import { ROLE } from '../constants/role.constant';

@ObjectType()
export class RegisterOutput {
  @Expose()
  @Field()
  id: number;

  @Expose()
  @Field()
  name: string;

  @Expose()
  @Field()
  username: string;

  @Expose()
  @Field((type) => ROLE)
  roles: ROLE[];

  @Expose()
  @Field()
  email: string;

  @Expose()
  @Field()
  isAccountDisabled: boolean;

  @Expose()
  @Field()
  createdAt: string;

  @Expose()
  @Field()
  updatedAt: string;
}
