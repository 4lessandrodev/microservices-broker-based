import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './model/invoice.model';
import * as axios from 'axios';

@Injectable()
export class AppService {
  private readonly invoices: Array<Invoice>;

  constructor() {
    this.invoices = [];
  }

  async createInvoice({ price, product, paymentId, user }: CreateInvoiceDto) {
    try {
      console.log('emitindo nota!');
      const invoice = Invoice.create(product, price, paymentId);

      this.invoices.push(invoice);

      /** @ts-ignore */
      await axios.post('http://localhost:3000/gateway/patient', { 
        paymentId: invoice.paymentId,
        name: user
      });

      return true;
    } catch (error: any) {
      // tratar excessões, erros que devem apagar a mensagem da fila
      return false;
    }
  }

  getInvoices() {
    try {
      console.log('request recebida!');
      return this.invoices;
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }
}
