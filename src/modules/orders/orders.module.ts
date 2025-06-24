import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { MailService } from 'src/shared/mail/sendgrid.service';
import { AuthModule } from '../auth/user.module';
import { OrdersService } from './application/orders.service';
import { OrdersController } from './infrastructure/controllers/orders.controller';
import { OrderRepositoryImpl } from './infrastructure/repository/order.repository';

@Module({
  imports: [AuthModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: 'OrderRepository',
      useClass: OrderRepositoryImpl,
    },
    PrismaService,
    MailService,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
