import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Ctx, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateStepDto as Dto } from './dto/create-step.dto';
import { GetStepDto as GDto } from './dto/get-step.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('@step')
  async createPayment(@Payload() dto: Dto, @Ctx() ctx: RmqContext): Promise<void> {
    const channel = ctx.getChannelRef();
    const msg = ctx.getMessage();

    const isSuccess = await this.appService.createStep(dto);

    // informar ao rabbitmq que a msg foi processada e pode ser apagada
    if (isSuccess) return await channel.ack(msg);

    // informar que a mensagem precisa ser processada novamente.
    if(!isSuccess) return await channel.nack(msg);
  }

  @MessagePattern('@get-step')
  getStep(@Ctx() ctx: RmqContext, @Payload() dto: GDto): Dto {
    const data = this.appService.getStep(dto.paymentId);

    const channel = ctx.getChannelRef();
    const msg = ctx.getMessage();

    // informar para rabbitmq que a mensagem foi processada com sucesso
    channel.ack(msg);
    return data;
  }
}
