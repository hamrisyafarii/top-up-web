import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @MaxLength(20)
  title: string;

  @IsString()
  slug: string;

  @IsString()
  @MaxLength(50)
  developer: string;

  @IsString()
  image: string;

  @IsString()
  @MaxLength(20)
  category: string;

  @IsBoolean()
  @IsOptional()
  popular?: boolean;
}
