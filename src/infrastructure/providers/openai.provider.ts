import OpenAI from 'openai';

import { AIPlatformProvider } from '@/application/providers/ai.provider';
import { Expense } from '@/domain/entities/expense';

export class OpenAIProvider implements AIPlatformProvider {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async guessExpenseCategory({ title, description, amount }: Expense): Promise<string> {
    const prompt = `Suggest a single category name for this expense: the title is "${title}", the description is "${description}" and the amount is ${amount}. 
    Response should be a single word or short phrase like: Groceries, Dining, Transportation, etc.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
    });

    return response.choices[0].message.content ?? '';
  }
}
