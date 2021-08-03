import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class LoginInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @Field()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;
}
