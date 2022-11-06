import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './model/invoice.model';

@Injectable()
export class AppService {
  private readonly invoices: Array<Invoice>;

  constructor() {
    this.invoices = [];
  }

  createInvoice({ price, product }: CreateInvoiceDto) {
    try {
      console.log('emitindo nota!');
      const invoice = Invoice.create(product, price);

      this.invoices.push(invoice);

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
