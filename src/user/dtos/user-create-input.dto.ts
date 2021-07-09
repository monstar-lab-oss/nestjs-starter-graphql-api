import {
  ArrayNotEmpty,
  IsAlphanumeric,
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

import { ROLE } from '../../auth/constants/role.constant';

export class CreateUserInput {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Length(6, 100)
  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  password: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(ROLE, { each: true })
  roles: ROLE[];

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsBoolean()
  isAccountDisabled: boolean;
}
