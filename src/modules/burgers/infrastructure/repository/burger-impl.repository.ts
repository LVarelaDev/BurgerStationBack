import { Injectable } from '@nestjs/common';
import { Burger } from '../../domain/entities/burger.entity';
import {
  AditionalsItem,
  BurgerRepository,
} from '../../domain/repositories/burger.repository';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class BurgerRepositoryImpl implements BurgerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllAdditionls(): Promise<AditionalsItem[]> {
    const result = await this.prisma.customizationOption.findMany();
    console.log('result', result);

    return result;
  }

  async create(data: {
    name: string;
    description: string;
    price: number;
  }): Promise<Burger> {
    const burger = await this.prisma.burger.create({ data });
    return this.toDomain(burger);
  }

  async findAll(): Promise<Burger[]> {
    const burgers = await this.prisma.burger.findMany();
    return burgers.map(this.toDomain);
  }

  async findById(id: number): Promise<Burger | null> {
    const burger = await this.prisma.burger.findUnique({ where: { id } });
    return burger ? this.toDomain(burger) : null;
  }

  private toDomain(burger: any): Burger {
    return new Burger(
      burger.id,
      burger.name,
      burger.description,
      burger.price,
      burger.createdAt,
      burger.updatedAt,
    );
  }
}
