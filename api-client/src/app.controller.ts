import { Body, Get, Param, Post, UsePipes } from '@nestjs/common';
import { Controller, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { Observable } from 'rxjs';
import { CreateDataDto } from './dto/create-data.dto';
import CreateInvoiceDto from './dto/create-invoice.dto';
import CreatePatientDto from './dto/create-patient.dto';
import DoneDto from './dto/done.dto';
import Step from './models/step.model';
import RabbitMqFactory from './rabbitmq/connection.factory';

@Controller('gateway')
export class AppController {
  private readonly brokerPayment: ClientProxy;
  private readonly brokerInvoices: ClientProxy;
  private readonly brokerSteps: ClientProxy;
  private readonly brokerPatients: ClientProxy;

  constructor(rabbitMQ: RabbitMqFactory) {
    this.brokerPayment = rabbitMQ.paymentQueue()
    this.brokerInvoices = rabbitMQ.invoicesQueue();
    this.brokerSteps = rabbitMQ.stepsQueue();
    this.brokerPatients = rabbitMQ.patientsQueue();
  }

  @Post('/buy')
  @UsePipes(ValidationPipe)
  async buy(@Body() dto: CreateDataDto) {
    const payment = { ...dto, paymentId: randomUUID() };
    this.brokerSteps.emit('@step', Step.start(payment.paymentId));
    this.brokerPayment.emit('@payment', payment);
    return { success: true };
  }

  @Post('/invoice')
  @UsePipes(ValidationPipe)
  async invoice(@Body() dto: CreateInvoiceDto) {
    const stepA = Step.start(dto.paymentId);
    const stepB = Step.updateStatus('paymentStatus', 'Done', stepA);
    this.brokerSteps.emit('@step', stepB);
    this.brokerInvoices.emit('@invoice', dto);
    return { success: true };
  }

  @Post('/patient')
  @UsePipes(ValidationPipe)
  async patient(@Body() dto: CreatePatientDto) {    
    const stepA = Step.start(dto.paymentId);
    const stepB = Step.updateStatus('paymentStatus', 'Done', stepA);
    const stepC = Step.updateStatus('invoiceStatus', 'Done', stepB);
    this.brokerSteps.emit('@step', stepC);
    this.brokerPatients.emit('@patient', dto);
    return { success: true };
  }

  @Post('/done')
  @UsePipes(ValidationPipe)
  async done(@Body() dto: DoneDto) {    
    const stepA = Step.start(dto.paymentId);
    const stepB = Step.updateStatus('paymentStatus', 'Done', stepA);
    const stepC = Step.updateStatus('invoiceStatus', 'Done', stepB);
    const stepD = Step.updateStatus('patientStatus', 'Done', stepC);
    this.brokerSteps.emit('@step', stepD);
    return { success: true };
  }

  @Get('/step/:paymentId')
  getStep(@Param('paymentId') paymentId: string): Observable<Step> {    
    return this.brokerSteps.send('@get-step', { paymentId });
  }

  @Get('/payments')
  getPayments(): Observable<Array<CreateDataDto>> {
    return this.brokerPayment.send('@get-payments', {});
  }

  @Get('/invoices')
  getInvoices(): Observable<Array<CreateDataDto>> {
    return this.brokerInvoices.send('@get-invoices', {});
  }

  @Get('/patients')
  getPatients(): Observable<Array<CreateDataDto>> {
    return this.brokerPatients.send('@get-patients', {});
  }
}
