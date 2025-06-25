import { Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/custom.exceptions';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateOrderDto } from '../../application/dtos/create-order.dto';
import { Order } from '../../domain/entities/order.entity';
import { OrderRepository } from '../../domain/repository/order.repository';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const result = await this.prisma.order.create({
        data: {
          userId: 2, //userid del oken
          total: createOrderDto.total,
          status: createOrderDto.status,
          customerNote: createOrderDto.customerNote,
          items: {
            create: createOrderDto.items.map((item) => ({
              burgerId: item.burgerId,
              quantity: item.quantity,
              price: item.price,
              customizations: {
                create: item.customizations.map((custom) => ({
                  customizationOption: {
                    connect: {
                      id: custom.customizationOptionId,
                      price: custom.price,
                    },
                  },
                })),
              },
            })),
          },
        },
        include: {
          items: {
            include: {
              customizations: true,
            },
          },
        },
      });
      return new Order(
        result.id,
        2,
        result.total,
        result.status,
        result.createdAt,
        result.updatedAt,
        result.items,
        result.customerNote ?? '',
      );
    } catch (error: any) {
      console.log('error', error);
      throw new Error('errr');
    }
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
