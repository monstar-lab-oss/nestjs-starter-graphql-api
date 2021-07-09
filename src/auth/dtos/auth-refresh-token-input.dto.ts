import { IsNotEmpty } from 'class-validator';

export class RefreshTokenInput {
  @IsNotEmpty()
  refreshToken: string;
}
