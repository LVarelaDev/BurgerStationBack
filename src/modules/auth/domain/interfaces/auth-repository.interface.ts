import { LoginRequestDto } from '../../application/dto/login-request.dto';
import { User } from '../entities/user.entity';

export interface AuthRepository {
  validateUser(credentials: LoginRequestDto): Promise<User>;
  findUserById(id: number): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
}
