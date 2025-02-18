import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { BaseDto } from '../base.dto';

export class SignInDto extends BaseDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
