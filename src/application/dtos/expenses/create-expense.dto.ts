import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExpenseDto {
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
