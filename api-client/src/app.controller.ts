import { Body, Get, Post, UsePipes } from '@nestjs/common';
import { Controller, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateNotifyDto } from './dto/create-notify.dto';
import RabbitMqFactory from './rabbitmq/connection.factory';

@Controller('notifications')
export class AppController {
  private readonly broker: ClientProxy;

  constructor(rabbitMQ: RabbitMqFactory) {
    this.broker = rabbitMQ.connect();
  }

  @Post()
  @UsePipes(ValidationPipe)
  notify(@Body() dto: CreateNotifyDto) {
    this.broker.emit('create-notification-mc-a', dto);
    this.broker.emit('create-notification-mc-b', dto);
    return { success: true };
  }

  @Get()
  getNotifications() {
    return this.broker.send('get-notifications', {});
  }
}
