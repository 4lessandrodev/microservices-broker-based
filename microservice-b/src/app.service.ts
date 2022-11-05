import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { Notification } from './model/notify.model';

@Injectable()
export class AppService {
  private readonly notifications: Array<Notification>;

  constructor() {
    this.notifications = [];
  }

  createNotification(dto: CreateNotifyDto) {
    try {
      console.log('notificação recebida em mc-b!');
      const notification = Notification.create(dto.message);

      const alreadyExists = this.notifications
        .map((val) => val.message.toLowerCase() === dto.message.toLowerCase())
        .includes(true);

      if (alreadyExists) return true;

      this.notifications.push(notification);
      return true;
    } catch (error: any) {
      // tratar excessões, erros que devem apagar a mensagem da fila
      return false;
    }
  }

  getNotifications() {
    try {
      console.log('request recebida!');
      return this.notifications;
    } catch (error: any) {
      throw new RpcException(error.message);
    }
  }
}
