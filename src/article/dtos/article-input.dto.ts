import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArticleInput {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  post: string;
}

export class UpdateArticleInput {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  post: string;
}
