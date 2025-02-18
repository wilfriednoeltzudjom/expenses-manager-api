import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { BaseDto } from '../base.dto';

export class CreateExpenseDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
