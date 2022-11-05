import { randomUUID } from 'crypto';

export class Notification {
  private constructor(message: string, id: string) {
    this.id = id;
    this.message = message;
  }

  public readonly id: string;
  public readonly message: string;

  public static create(message: string): Notification {
    const uuid = randomUUID();
    const notification = new Notification(message, uuid);
    return notification;
  }
}

export default Notification;
