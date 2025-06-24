import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { OrderRepository } from '../../domain/repository/order.repository';
import { CreateOrderDto } from '../../application/dtos/create-order.dto';
import { Order } from '../../domain/entities/order.entity';
import { NotFoundException } from 'src/common/exceptions/custom.exceptions';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateOrderDto): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  async findAll(userId: number): Promise<Order[]> {
    const orderList = await this.prisma.order.findMany({
      include: {
        items: {
          include: {
            burger: {
              include: {
                orders: true,
              },
            },
          },
        },
      },
      where: {
        userId,
      },
    });

    return orderList.map(
      (item) =>
        new Order(
          item.id,
          item.userId,
          item.total,
          item.status,
          item.createdAt,
          item.updatedAt,
          item.items,
          item.customerNote?.toString(),
        ),
    );
  }
  async findById(userId: number, id: number): Promise<Order> {
    const order = await this.prisma.order.findFirst({
      where: { id, userId },
      include: {
        items: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return new Order(
      order.id,
      order.userId,
      order.total,
      order.status,
      order.createdAt,
      order.updatedAt,
      order.items,
      order.customerNote?.toString(),
    );
  }
}
