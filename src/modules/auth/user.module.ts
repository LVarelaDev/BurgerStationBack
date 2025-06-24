import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { JwtTokenService } from './infrastructure/services/jwt-token.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { PrismaAuthRepository } from './infrastructure/repositories/auth.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    {
      provide: 'AuthRepository',
      useClass: PrismaAuthRepository,
    },
    {
      provide: 'TokenService',
      useClass: JwtTokenService,
    },
  ],
  exports: ['AuthRepository', 'TokenService', AuthService],
})
export class AuthModule {}
