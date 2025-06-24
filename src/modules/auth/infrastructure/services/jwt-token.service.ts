import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../../domain/interfaces/token-service.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateToken(payload: any): string {
    try {
      if (!this.configService.get<string>('JWT_SECRET')) {
        throw new Error('JWT_SECRET is not configured');
      }

      return this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '1h'),
      });
    } catch (error) {
      throw new UnauthorizedException(
        'Error generating token: ' + error.message,
      );
    }
  }

  verifyToken(token: string): any {
    try {
      if (!this.configService.get<string>('JWT_SECRET')) {
        throw new Error('JWT_SECRET is not configured');
      }

      return this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
