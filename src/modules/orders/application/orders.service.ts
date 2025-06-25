import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AuthRepository } from 'src/modules/auth/domain/interfaces/auth-repository.interface';
import { NotFoundException } from 'src/common/exceptions/custom.exceptions';
import { OrderRepository } from '../domain/repository/order.repository';
import { MailService } from 'src/shared/mail/sendgrid.service';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
    @Inject('AuthRepository') private readonly authRepository: AuthRepository,
    private readonly mailService: MailService,
  ) {}

  async createOrder(userId: number, createOrderDto: CreateOrderDto) {
    const user = await this.authRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const order = await this.orderRepository.create(createOrderDto);

    await this.mailService.sendOrderConfirmation(user, order);

    return order;
  }

  async findById(userid: number, id: number) {
    const order = await this.orderRepository.findById(userid, id);
  }

  async findAllOrder(userId: number) {
    return await this.orderRepository.findAll(userId);
  }
}
