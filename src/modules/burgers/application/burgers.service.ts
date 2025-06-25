import { Inject, Injectable } from '@nestjs/common';
import {
  AditionalsItem,
  BurgerRepository,
} from '../domain/repositories/burger.repository';
import { BurgerResponseDto } from './dtos/create-burger.dto';
import { NotFoundException } from 'src/common/exceptions/custom.exceptions';

@Injectable()
export class BurgersService {
  constructor(
    @Inject('BurgerRepository')
    private readonly burgerRepository: BurgerRepository,
  ) {}

  async getAllBurgers() {
    return this.burgerRepository.findAll();
  }

  async getBurgerById(
    id: number,
  ): Promise<{ burger: BurgerResponseDto; additionalsItem: any }> {
    const burger = await this.burgerRepository.findById(id);

    if (!burger) throw new NotFoundException('Burger not found');

    const burgerResponseDto = new BurgerResponseDto();
    burgerResponseDto.name = burger.name;
    burgerResponseDto.price = burger.price;
    burgerResponseDto.id = burger.id;
    burgerResponseDto.description = burger.description;
    burgerResponseDto.createdAt = burger.createdAt;
    burgerResponseDto.updatedAt = burger.updatedAt;

    const additionalsItem = await this.getGroupedCustomizations();

    return {
      burger: burgerResponseDto,
      additionalsItem,
    };
  }

  async getGroupedCustomizations() {
    const allOptions = await this.burgerRepository.findAllAdditionls();

    return {
      additions: allOptions
        .filter((opt) => opt.category === 'Adiciones')
        .map((x) => ({
          id: x.id,
          name: x.name,
          price: x.price,
        })),
      sauces: allOptions
        .filter((opt) => opt.category === 'Salsas')
        .map((x) => ({
          id: x.id,
          name: x.name,
          price: x.price,
        })),
      fries: allOptions
        .filter((opt) => opt.category === 'Papas')
        .map((x) => ({
          id: x.id,
          name: x.name,
          price: x.price,
        })),
      drinks: allOptions
        .filter((opt) => opt.category === 'Bebidas')
        .map((x) => ({
          id: x.id,
          name: x.name,
          price: x.price,
        })),
    };
  }
}
