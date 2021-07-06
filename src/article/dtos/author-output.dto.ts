import { Expose } from 'class-transformer';

export class AuthorOutput {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
