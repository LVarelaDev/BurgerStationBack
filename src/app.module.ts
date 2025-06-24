import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/user.module';
import { BurgersModule } from './modules/burgers/burgers.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PrismaModule } from './shared/database/prisma.module';

@Module({
  imports: [
    PrismaModule,
    OrdersModule,
    BurgersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
