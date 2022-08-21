import { ClientProxy, Transport } from '@nestjs/microservices';
import { ClientProxyFactory } from '@nestjs/microservices';

export class RabbitMqFactory {
  constructor() {
    this.connection = null;
  }
  public connect(): ClientProxy {
    if (!this.connection) {
      this.connection = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          // amqp://user:pass@host:10000/virtual-host
          urls: ['amqp://username:password@localhost:5672'],
          queue: 'notifications',
        },
      });
    }
    return this.connection;
  }
  private connection: ClientProxy | null;
}

export default RabbitMqFactory;
