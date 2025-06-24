import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { ConflictException } from 'src/common/exceptions/custom.exceptions';
import { User } from '../../domain/entities/user.entity';
import { AuthRepository } from '../../domain/interfaces/auth-repository.interface';
import { TokenService } from '../../domain/interfaces/token-service.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginRequestDto } from '../dto/login-request.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
    @Inject('TokenService')
    private readonly tokenService: TokenService,
  ) {}

  async login(credentials: LoginRequestDto): Promise<LoginResponseDto> {
    console.log('credentials', credentials);
    const user = await this.authRepository.validateUser(credentials);
    const token = this.tokenService.generateToken({
      sub: user.id,
      email: user.email,
      name: user.name,
    });

    return LoginResponseDto.fromDomain(user, token);
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.authRepository.findUserByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    if (
      createUserDto.typeDocument === 'NIT' &&
      (createUserDto.document.length < 9 || createUserDto.document.length > 12)
    ) {
      throw new ConflictException('El NIT debe tener entre 9 y 12 dígitos');
    }

    const hashedPassword = await this.hashPassword(createUserDto.password);
    const newUser = new User(
      0,
      createUserDto.name,
      createUserDto.typeDocument,
      createUserDto.document,
      createUserDto.address,
      createUserDto.phone,
      createUserDto.email,
      hashedPassword,
      new Date(),
      new Date(),
    );
    const userCreated = await this.authRepository.createUser(newUser);

    return userCreated;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
