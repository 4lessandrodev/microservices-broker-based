import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateStepDto } from './dto/create-step.dto';

@Injectable()
export class AppService {
  private steps: Array<CreateStepDto>;

  constructor() {
    this.steps = [];
  }

  createStep(step: CreateStepDto) {
    try {
      console.log('processando step!');
      console.table(step);
    
      this.steps = this.steps.filter((st) => st.paymentId !== step.paymentId);
      this.steps.push(step);
      return true;
    } catch (error: any) {
      // tratar excessões, erros que devem apagar a mensagem da fila
      return false;
    }
  }

  getStep(paymentId: string) {
    try {
      console.log('request recebida!');
      return this.steps.find((st) => st?.paymentId === paymentId) ?? {} as any;
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }
}
