import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateMovieDto {
  // 사람들이 movie를 만들기 위해서 필요한 것들을 나열
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
