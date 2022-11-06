import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Ctx, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreatePaymentDto as Dto } from './dto/create-payment.dto';
import Payment from './model/payment.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('@payment')
  async createPayment(@Payload() dto: Dto, @Ctx() ctx: RmqContext): Promise<void> {
    const channel = ctx.getChannelRef();
    const msg = ctx.getMessage();

    const isSuccess = this.appService.createPayment(dto);

    // informar ao rabbitmq que a msg foi processada e pode ser apagada
    if (isSuccess) return await channel.ack(msg);

    // informar que a mensagem precisa ser processada novamente.
    if(!isSuccess) return await channel.nack(msg);
  }

  @MessagePattern('@get-payments')
  getPayments(@Ctx() ctx: RmqContext): Array<Payment> {
    const data = this.appService.getPayments();

    const channel = ctx.getChannelRef();
    const msg = ctx.getMessage();

    // informar para rabbitmq que a mensagem foi processada com sucesso
    channel.ack(msg);
    return data;
  }
}
