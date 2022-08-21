import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateNotifyDto } from './create-notify.dto';
import { Notification } from './notify.model';

@Injectable()
export class AppService {
  private readonly notifications: Array<Notification>;

  constructor() {
    this.notifications = [];
  }

  createNotification(dto: CreateNotifyDto) {
    try {
      console.log('notificação recebida!');
      const notification = Notification.create(dto.message);
      this.notifications.push(notification);
    } catch (error: any) {
      throw new RpcException(error.message);
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
