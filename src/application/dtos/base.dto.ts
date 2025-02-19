import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject, ValidationError as ClassValidatorError } from 'class-validator';

import { ValidationError } from '../errors';

export abstract class BaseDto {
  static async create<T extends BaseDto>(this: ClassConstructor<T>, json: unknown): Promise<T> {
    const dto = plainToClass(this, json);
    try {
      await validateOrReject(dto);
      return dto;
    } catch (errors) {
      if (Array.isArray(errors) && errors[0] instanceof ClassValidatorError) {
        const validationErrors = errors.map((error: ClassValidatorError) => ({
          property: error.property,
          constraints: error.constraints,
        }));
        throw new ValidationError('Validation failed', validationErrors);
      }
      throw errors;
    }
  }
}
