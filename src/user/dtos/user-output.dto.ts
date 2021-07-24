import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

import { ROLE } from '../../auth/constants/role.constant';

@ObjectType()
export class UserOutput {
  @Expose()
  @Field(() => Int)
  id: number;

  @Expose()
  @Field()
  name: string;

  @Expose()
  @Field()
  username: string;

  @Expose()
  @Field(() => [ROLE])
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
