import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from '../../domain/interfaces/auth-repository.interface';
import { PrismaService } from 'src/shared/database/prisma.service';
import { LoginRequestDto } from '../../application/dto/login-request.dto';
import { User } from '../../domain/entities/user.entity';
import { UnauthorizedException } from 'src/common/exceptions/custom.exceptions';
import { CreateUserDto } from '../../application/dto/create-user.dto';

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return new User(
      user.id,
      user.name,
      user.typeDocument as any,
      user.document,
      user.address,
      user.phone,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt,
    );
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          typeDocument: createUserDto.typeDocument,
          document: createUserDto.document,
          address: createUserDto.address,
          phone: createUserDto.phone,
          email: createUserDto.email,
          password: await bcrypt.hash(createUserDto.password, 10),
        },
      });

      return new User(
        user.id,
        user.name,
        user.typeDocument as any,
        user.document,
        user.address,
        user.phone,
        user.email,
        user.password,
        user.createdAt,
        user.updatedAt,
      );
    } catch (error) {
      throw new UnauthorizedException('Error creating user: ' + error.message);
    }
  }

  async validateUser(credentials: LoginRequestDto): Promise<User> {
    console.log('credentials', credentials);
    const user = await this.prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // const isValid = await bcrypt.compare(credentials.password, user.password);
    // if (!isValid) {
    //   throw new Error('Invalid credentials');
    // }

    return new User(
      user.id,
      user.name,
      user.typeDocument as any,
      user.document,
      user.address,
      user.phone,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt,
    );
  }

  async findUserById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;

    return new User(
      user.id,
      user.name,
      user.typeDocument as any,
      user.document,
      user.address,
      user.phone,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt,
    );
  }
}
