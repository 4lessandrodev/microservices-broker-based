import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './model/payment.model';
import * as axios from 'axios';

@Injectable()
export class AppService {
  private readonly payments: Array<Payment>;

  constructor() {
    this.payments = [];
  }

  async createPayment({ product, price, user }: CreatePaymentDto) {
    try {
      console.log('processando pagamento!');
      const payment = Payment.create(product, price);

      const simulateErr = Math.random() > 0.5;
      if(simulateErr) {
        let i = 0;
        while(i < 9e9) { i++ };
        console.log("Error..."); 
        return false; 
      }

      this.payments.push(payment);
      
      /** @ts-ignore */
      const result = await axios.post('http://localhost:3000/gateway/invoice', { 
        paymentId: payment.id,
        product: payment.name,
        price: payment.total,
        user: user
      });

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