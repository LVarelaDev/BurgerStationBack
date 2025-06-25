import { Burger } from '../entities/burger.entity';

export interface AditionalsItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface BurgerRepository {
  findAll(): Promise<Burger[]>;
  findById(id: number): Promise<Burger | null>;
  findAllAdditionls(): Promise<AditionalsItem[]>;
}
