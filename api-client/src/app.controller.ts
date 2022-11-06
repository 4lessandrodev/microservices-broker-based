import { Body, Get, Post, UsePipes } from '@nestjs/common';
import { Controller, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateDataDto } from './dto/create-data.dto';
import RabbitMqFactory from './rabbitmq/connection.factory';

@Controller('gateway')
export class AppController {
  private readonly brokerPayment: ClientProxy;
  private readonly brokerInvoices: ClientProxy;

  constructor(rabbitMQ: RabbitMqFactory) {
    this.brokerPayment = rabbitMQ.paymentQueue()
    this.brokerInvoices = rabbitMQ.invoicesQueue();
  }

  @Post('/buy')
  @UsePipes(ValidationPipe)
  async buy(@Body() dto: CreateDataDto) {    
    this.brokerPayment.emit('@payment', dto);
    this.brokerInvoices.emit('@invoice', dto);
    return { success: true };
  }

  @Get('/payments')
  getPayments(): Observable<Array<CreateDataDto>> {
    return this.brokerPayment.send('@get-payments', {});
  }

  @Get('/invoices')
  getInvoices(): Observable<Array<CreateDataDto>> {
    return this.brokerInvoices.send('@get-invoices', {});
  }
}
