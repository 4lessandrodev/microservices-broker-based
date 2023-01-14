import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './model/payment.model';

@Injectable()
export class AppService {
  private readonly payments: Array<Payment>;

  constructor() {
    this.payments = [];
  }

  createPayment({ product, price }: CreatePaymentDto) {
    try {
      console.log('processando pagamento...');
      const payment = Payment.create(product, price);

      const simulateErr = Math.random() > 0.5;
      if(simulateErr) {
        let i = 0;
        while(i < 9e3) { i++ };
        console.log(`erro ao realizar o pagamento: ${payment.id}.`);
        console.log('tentando processar o pagamento novamente!');
        return false; 
      }

      console.log('pagamento processado com sucesso!');
      this.payments.push(payment);
      return true;
    } catch (error: any) {
      // tratar excessões, erros que devem apagar a mensagem da fila
      return false;
    }
  }

  getPayments() {
    try {
      console.log('request recebida!');
      return this.payments;
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }
}
