import { inject, injectable } from 'tsyringe';

import { SignInDto } from '@/application/dtos/users/sign-in.dto';
import { SignUpDto } from '@/application/dtos/users/sign-up.dto';
import { HttpRequest } from '@/application/payloads/http-request';
import { HttpResponse } from '@/application/payloads/http-response';
import { SignInUseCase } from '@/use-cases/users/sign-in.usecase';
import { SignUpUseCase } from '@/use-cases/users/sign-up.usecase';

@injectable()
export class AuthController {
  constructor(
    @inject('SignUpUseCase') private readonly signUpUseCase: SignUpUseCase,
    @inject('SignInUseCase') private readonly signInUseCase: SignInUseCase,
  ) {}

  async signUp(httpRequest: HttpRequest) {
    const signUpDto = await SignUpDto.create(httpRequest.body);
    const user = await this.signUpUseCase.execute(signUpDto);

    return HttpResponse.created(user);
  }

  async signIn(httpRequest: HttpRequest) {
    const signInDto = await SignInDto.create(httpRequest.body);
    const signInResponse = await this.signInUseCase.execute(signInDto);

    return HttpResponse.succeeded(signInResponse);
  }
}
