import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationParamsDto {
  @IsNumber()
  @IsOptional()
  @Transform((value) => parseInt(value, 10), { toClassOnly: true })
  limit = 100;

  @IsNumber()
  @IsOptional()
  @Transform((value) => parseInt(value, 10), { toClassOnly: true })
  offset = 0;
}
