export class OrderItem {
  constructor(
    public readonly id: number,
    public readonly burgerId: number,
    public readonly quantity: number,
    public readonly price: number,
    public readonly customizations: {
      optionId: number;
      name: string;
      price: number;
    }[],
  ) {}
}
