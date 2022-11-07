import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Ctx, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreatePatientDto as Dto } from './dto/create-patient.dto';
import Patient from './model/patient.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('@patient')
  async createPayment(@Payload() dto: Dto, @Ctx() ctx: RmqContext): Promise<void> {
    const channel = ctx.getChannelRef();
    const msg = ctx.getMessage();

    const isSuccess = await this.appService.createPatient(dto);
    
    // informar ao rabbitmq que a msg foi processada e pode ser apagada
    if (isSuccess) return await channel.ack(msg);

    // informar que a mensagem precisa ser processada novamente.
    if(!isSuccess) return await channel.nack(msg);
  }

  @MessagePattern('@get-patients')
  getPatients(@Ctx() ctx: RmqContext): Array<Patient> {
    const data = this.appService.getPatients();

    const channel = ctx.getChannelRef();
    const msg = ctx.getMessage();

    // informar para rabbitmq que a mensagem foi processada com sucesso
    channel.ack(msg);
    return data;
  }
}
