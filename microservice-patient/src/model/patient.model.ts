import { randomUUID } from 'crypto';

export class Patient {
  private constructor(name: string, id: string, paymentId: string) {
    this.id = id;
    this.name = name;
    this.paymentId = paymentId;
  }

  public readonly id: string;
  public readonly name: string;
  public readonly total: number;
  public readonly paymentId: string;

  public static create(name: string, paymentId: string): Patient {
    const uuid = randomUUID();
    const patient = new Patient(name, uuid, paymentId);
    return patient;
  }
}

export default Patient;
