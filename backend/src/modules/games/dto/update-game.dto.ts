import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { CreateGameDto } from './create-game.dto';

export class UpdateGameDto implements Partial<CreateGameDto> {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  developer: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  category: string;

  @IsBoolean()
  @IsOptional()
  popular?: boolean;
}
