import { Inject, Injectable } from '@nestjs/common';
import { BurgerRepository } from '../domain/repositories/burger.repository';
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

  async getBurgerById(id: number): Promise<BurgerResponseDto> {
    const burger = await this.burgerRepository.findById(id);

    if (!burger) throw new NotFoundException('Burger not found');

    const burgerResponseDto = new BurgerResponseDto();
    burgerResponseDto.name = burger.name;
    burgerResponseDto.price = burger.price;
    burgerResponseDto.id = burger.id;
    burgerResponseDto.description = burger.description;
    burgerResponseDto.createdAt = burger.createdAt;
    burgerResponseDto.updatedAt = burger.updatedAt;

    return burgerResponseDto;
  }
}
