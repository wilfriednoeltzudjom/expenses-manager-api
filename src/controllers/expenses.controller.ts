import { inject, injectable } from 'tsyringe';

import { CreateExpenseDto } from '@/application/dtos/expenses/create-expense.dto';
import { EXPENSE_CREATED, EXPENSE_DELETED } from '@/application/messages/expense.messages';
import { HttpRequest } from '@/application/payloads/http-request';
import { HttpResponse } from '@/application/payloads/http-response';
import { CreateExpenseUseCase } from '@/use-cases/expenses/create-expense.usecase';
import { DeleteExpenseUseCase } from '@/use-cases/expenses/delete-expense.usecase';
import { GetUserExpensesUseCase } from '@/use-cases/expenses/get-user-expenses.usecase';

@injectable()
export class ExpensesController {
  constructor(
    @inject('CreateExpenseUseCase') private readonly createExpenseUseCase: CreateExpenseUseCase,
    @inject('GetUserExpensesUseCase') private readonly getUserExpensesUseCase: GetUserExpensesUseCase,
    @inject('DeleteExpenseUseCase') private readonly deleteExpenseUseCase: DeleteExpenseUseCase,
  ) {}

  async createExpense(httpRequest: HttpRequest) {
    const createExpenseDto = await CreateExpenseDto.create(httpRequest.body);
    const expense = await this.createExpenseUseCase.execute(httpRequest.user.id, createExpenseDto);

    return HttpResponse.created(expense, EXPENSE_CREATED());
  }

  async getUserExpenses(httpRequest: HttpRequest) {
    const expenses = await this.getUserExpensesUseCase.execute(httpRequest.user.id);

    return HttpResponse.succeeded(expenses);
  }

  async deleteExpense(httpRequest: HttpRequest) {
    const { expenseId } = httpRequest.params as { expenseId: string };
    const expense = await this.deleteExpenseUseCase.execute(expenseId);

    return HttpResponse.succeeded(expense, EXPENSE_DELETED());
  }
}
