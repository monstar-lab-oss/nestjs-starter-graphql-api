import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

import { ROLE } from '../constants/role.constant';

@ObjectType('AuthToken')
export class AuthTokenOutput {
  @Expose()
  @Field()
  accessToken: string;

  @Expose()
  @Field()
  refreshToken: string;
}

export class UserAccessTokenClaims {
  @Expose()
  id: number;
  @Expose()
  username: string;
  @Expose()
  roles: ROLE[];
}

export class UserRefreshTokenClaims {
  id: number;
}
