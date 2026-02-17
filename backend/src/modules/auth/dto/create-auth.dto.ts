import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(25)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(25)
  password: string;

  @IsString()
  @IsOptional()
  name: string;
}
