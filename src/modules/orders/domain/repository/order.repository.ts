import { CreateOrderDto } from '../../application/dtos/create-order.dto';
import { Order } from '../entities/order.entity';

export interface OrderRepository {
  create(data: CreateOrderDto): Promise<Order>;
  findAll(userId: number): Promise<Order[]>;
  findById(userid: number, id: number): Promise<Order>;
}
