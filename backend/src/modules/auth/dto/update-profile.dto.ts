import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  @MaxLength(25)
  username?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;
}
