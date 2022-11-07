import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreatePatientDto as Dto } from './dto/create-patient.dto';
import { Patient } from './model/patient.model';
import * as axios from 'axios';

@Injectable()
export class AppService {
  private readonly patients: Array<Patient>;

  constructor() {
    this.patients = [];
  }

  async createPatient({ name, paymentId }: Dto) {
    try {
      console.log('processando paciente!');
      const patient = Patient.create(name, paymentId);

      const simulateErr = Math.random() > 0.5;
      if(simulateErr) {
        let i = 0;
        while(i < 9e9) { i++ };
        console.log("Error..."); 
        return false; 
      }

      this.patients.push(patient);

      /** @ts-ignore */
      await axios.post('http://localhost:3000/gateway/done', { 
        paymentId: patient.paymentId
      });

      return true;
    } catch (error: any) {
      // tratar excessões, erros que devem apagar a mensagem da fila
      return false;
    }
  }

  getPatients() {
    try {
      console.log('request recebida!');
      return this.patients;
    } catch (error: any) {
      console.log(error);
      throw new RpcException(error.message);
    }
  }
}
