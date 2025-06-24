export class Burger {
  constructor(
    public readonly id: number,
    public name: string,
    public description: string,
    public price: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
