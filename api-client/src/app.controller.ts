import { Body, Get, Post, UsePipes } from '@nestjs/common';
import { Controller, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateDataDto } from './dto/create-data.dto';
import RabbitMqFactory from './rabbitmq/connection.factory';

@Controller('gateway')
export class AppController {
  private readonly brokerPayment: ClientProxy;
  private readonly brokerInvoices: ClientProxy;

  constructor(rabbitMQ: RabbitMqFactory) {
    this.brokerPayment = rabbitMQ.paymentQueue()
    this.brokerInvoices = rabbitMQ.invoicesQueue();
    this.brokerInvoices.connect();
    this.brokerPayment.connect();
  }

  @Post('/buy')
  @UsePipes(ValidationPipe)
  async buy(@Body() dto: CreateDataDto) {
    this.brokerInvoices.connect();
    this.brokerPayment.connect();
    await firstValueFrom(this.brokerPayment.emit('@payment', dto));
    await firstValueFrom(this.brokerInvoices.emit('@invoice', dto));
    this.brokerInvoices.close();
    this.brokerPayment.close();
    return { success: true };
  }

  @Get('/payments')
  async getPayments(): Promise<Array<CreateDataDto>> {
    this.brokerPayment.connect();
    const result = await firstValueFrom<Array<CreateDataDto>>(this.brokerPayment.send('@get-payments', {}));
    this.brokerPayment.close();
    return result;
  }

  @Get('/invoices')
  async getInvoices(): Promise<Array<CreateDataDto>> {
    this.brokerInvoices.connect();
    const result = await firstValueFrom<Array<CreateDataDto>>(this.brokerInvoices.send('@get-invoices', {}));
    this.brokerInvoices.close();
    return result;
  }
}
