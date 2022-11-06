import { ClientProxy, Transport } from '@nestjs/microservices';
import { ClientProxyFactory } from '@nestjs/microservices';

export class RabbitMqFactory {
  constructor() {
    this.paymentsConnection = null;
    this.invoicesConnection = null;
  }
  
  public paymentQueue(): ClientProxy {
    if (!this.paymentsConnection) {
      this.paymentsConnection = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          // amqp://user:pass@host:10000/virtual-host
          urls: ['amqp://username:password@localhost:5672'],
          queue: 'payments',
          queueOptions: {
            durable: true
          }
        },
      });
    }
    return this.paymentsConnection;
  }

  public invoicesQueue(): ClientProxy {
    if (!this.invoicesConnection) {
      this.invoicesConnection = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          // amqp://user:pass@host:10000/virtual-host
          urls: ['amqp://username:password@localhost:5672'],
          queue: 'invoices',
          queueOptions: {
            durable: true
          }
        },
      });
    }
    return this.invoicesConnection;
  }
  private paymentsConnection: ClientProxy | null;
  private invoicesConnection: ClientProxy | null;
}

export default RabbitMqFactory;
