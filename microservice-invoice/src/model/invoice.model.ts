import { randomUUID } from 'crypto';

export class Invoice {
  private constructor(product: string, id: string, price: number, paymentId: string) {
    this.id = id;
    this.product = product;
    this.price = price;
    this.paymentId = paymentId;
  }

  public readonly id: string;
  public readonly product: string;
  public readonly price: number;
  public readonly paymentId: string;

  public static create(product: string, price: number, paymentId: string): Invoice {
    const uuid = randomUUID();
    const invoice = new Invoice(product, uuid, price, paymentId);
    return invoice;
  }
}

export default Invoice;
