import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Ctx, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateInvoiceDto as Dto } from './dto/create-invoice.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('@invoice')
  async createNotification(@Payload() dto: Dto, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const msg = ctx.getMessage();

    const isSuccess = await this.appService.createInvoice(dto);

    // informar ao rabbitmq que a msg foi processada e pode ser apagada
    if (isSuccess) return await channel.ack(msg);

    // informar que a mensagem precisa ser processada novamente.
    if (!isSuccess) return await channel.nack(msg);
  }

  @MessagePattern('@get-invoices')
  getInvoices(@Ctx() ctx: RmqContext) {
    const data = this.appService.getInvoices();

    const channel = ctx.getChannelRef();
    const msg = ctx.getMessage();

    // informar para rabbitmq que a mensagem foi processada com sucesso
    channel.ack(msg);
    return data;
  }
}
