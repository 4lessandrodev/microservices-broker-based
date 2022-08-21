import { Body, Get, Post, UsePipes } from '@nestjs/common';
import { Controller, ValidationPipe } from '@nestjs/common';
import { ClientProxy, Transport } from '@nestjs/microservices';
import { ClientProxyFactory } from '@nestjs/microservices';
import { CreateNotifyDto } from './create-notify.dto';

@Controller('notifications')
export class AppController {
  private readonly broker: ClientProxy;
  constructor() {
    this.broker = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        // amqp://user:pass@host:10000/virtual-host
        urls: ['amqp://username:password@localhost:5672'],
        queue: 'notifications',
      },
    });
  }

  @Post()
  @UsePipes(ValidationPipe)
  notify(@Body() dto: CreateNotifyDto) {
    this.broker.emit('create-notification', dto);
    return { success: true };
  }

  @Get()
  getNotifications() {
    return this.broker.send('get-notifications', {});
  }
}
