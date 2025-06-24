import { Burger } from '../entities/burger.entity';

export interface BurgerRepository {
  findAll(): Promise<Burger[]>;
  findById(id: number): Promise<Burger | null>;
}
