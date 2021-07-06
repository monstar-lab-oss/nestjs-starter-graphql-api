import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
