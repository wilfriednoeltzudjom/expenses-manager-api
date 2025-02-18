import { inject, injectable } from 'tsyringe';

import { CreateExpenseDto } from '@/application/dtos/expenses/create-expense.dto';
import { EXPENSE_CREATED } from '@/application/messages/expense.messages';
import { HttpRequest } from '@/application/payloads/http-request';
import { HttpResponse } from '@/application/payloads/http-response';
import { CreateExpenseUseCase } from '@/use-cases/expenses/create-expense.usecase';

@injectable()
export class ExpensesController {
  constructor(@inject('CreateExpenseUseCase') private readonly createExpenseUseCase: CreateExpenseUseCase) {}

  async createExpense(httpRequest: HttpRequest) {
    const createExpenseDto = await CreateExpenseDto.create(httpRequest.body);
    const expense = await this.createExpenseUseCase.execute(httpRequest.user.id, createExpenseDto);

    return HttpResponse.created(expense, EXPENSE_CREATED());
  }
}
