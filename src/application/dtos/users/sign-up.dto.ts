import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { BaseDto } from '../base.dto';

export class SignUpDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
