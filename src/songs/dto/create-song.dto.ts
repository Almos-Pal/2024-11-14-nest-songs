import { IsDefined, IsInt, IsOptional, Max, Min } from 'class-validator';

export class CreateSongDto {
  @IsDefined()
  cim: string;
  @IsDefined()
  szerzo: string;
  @IsDefined()
  @Min(0)
  @IsInt()
  hossz: number;
  @IsOptional()
  @Min(0)
  @IsInt()
  ar: number;
  @IsOptional()
  @Min(1)
  @Max(5)
  @IsInt()
  ertekeles: number;
}
