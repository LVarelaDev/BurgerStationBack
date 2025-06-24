import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { BurgersService } from './application/burgers.service';
import { BurgersController } from './infrastructure/controllers/burgers.controller';
import { BurgerRepositoryImpl } from './infrastructure/repository/prisma-burger.repository';

@Module({
  controllers: [BurgersController],
  providers: [
    BurgersService,
    {
      provide: 'BurgerRepository',
      useClass: BurgerRepositoryImpl,
    },
    PrismaService,
  ],
  exports: [BurgersService],
})
export class BurgersModule {}
