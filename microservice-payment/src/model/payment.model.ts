import { randomUUID } from 'crypto';

export class Payment {
  private constructor(name: string, id: string, total: number) {
    this.id = id;
    this.name = name;
    this.total = total;
  }

  public readonly id: string;
  public readonly name: string;
  public readonly total: number;

  public static create(name: string, total: number): Payment {
    const uuid = randomUUID();
    const payment = new Payment(name, uuid, total);
    return payment;
  }
}

export default Payment;
