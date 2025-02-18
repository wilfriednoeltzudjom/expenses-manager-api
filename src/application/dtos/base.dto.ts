import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export abstract class BaseDto {
  static async create<T extends BaseDto>(this: ClassConstructor<T>, json: unknown): Promise<T> {
    const dto = plainToClass(this, json);
    await validateOrReject(dto);

    return dto;
  }
}
