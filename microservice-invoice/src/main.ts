import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      // amqp://user:pass@host:10000/virtual-host
      urls: ['amqp://username:password@localhost:5672'],
      queue: 'invoices',
      // não apaga a mensagem da fila automaticamente
      noAck: false,
      queueOptions: {
        durable: true
      }
    },
  });
  await app.listen();
}
bootstrap();
