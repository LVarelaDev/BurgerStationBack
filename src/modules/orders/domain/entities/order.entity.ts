import { OrderItem } from '@prisma/client';

export class Order {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly total: number,
    public readonly status: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly items: OrderItem[],
    public readonly customerNote?: string,
  ) {}
}
