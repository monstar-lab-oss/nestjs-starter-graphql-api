import {
  IsNotEmpty,
  MaxLength,
  Length,
  IsString,
  IsEmail,
} from 'class-validator';
import { ROLE } from '../constants/role.constant';

export class RegisterInput {
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  name: string;

  @MaxLength(200)
  @IsString()
  username: string;

  @IsNotEmpty()
  @Length(6, 100)
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  // These keys can only be set by ADMIN user.
  roles: ROLE[] = [ROLE.USER];
  isAccountDisabled: boolean;
}
