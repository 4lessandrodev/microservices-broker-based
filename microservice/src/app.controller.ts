import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Ctx, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateNotifyDto as Dto } from './create-notify.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('create-notification')
  async createNotification(@Payload() dto: Dto, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const msg = ctx.getMessage();

    const isSuccess = this.appService.createNotification(dto);

    // informar ao rabbitmq que a msg foi processada e pode ser apagada
    if (isSuccess) return await channel.ack(msg);

    // informar que a mensagem precisa ser processada novamente.
    return await channel.nack(msg);
  }

  @MessagePattern('get-notifications')
  getNotifications(@Ctx() ctx: RmqContext) {
    const data = this.appService.getNotifications();

    const channel = ctx.getChannelRef();
    const msg = ctx.getMessage();

    // informar para rabbitmq que a mensagem foi processada com sucesso
    channel.ack(msg);
    return data;
  }
}
