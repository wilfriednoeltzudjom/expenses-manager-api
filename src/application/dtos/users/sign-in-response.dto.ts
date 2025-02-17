import { User } from '@/domain/entities/user';

export interface SignInResponseDto {
  token: string;
  user: User;
}
