import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

import { ROLE } from '../constants/role.constant';

@InputType()
export class RegisterInput {
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  @Field()
  name: string;

  @MaxLength(200)
  @IsString()
  @Field()
  username: string;

  @IsNotEmpty()
  @Length(6, 100)
  @IsString()
  @Field()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  @Field()
  email: string;

  // These keys can only be set by ADMIN user.
  roles: ROLE[] = [ROLE.USER];
  isAccountDisabled: boolean;
}
