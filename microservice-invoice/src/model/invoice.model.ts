import { randomUUID } from 'crypto';

export class Invoice {
  private constructor(product: string, id: string, price: number) {
    this.id = id;
    this.product = product;
    this.price = price;
  }

  public readonly id: string;
  public readonly product: string;
  public readonly price: number;

  public static create(product: string, price: number): Invoice {
    const uuid = randomUUID();
    const invoice = new Invoice(product, uuid, price);
    return invoice;
  }
}

export default Invoice;
