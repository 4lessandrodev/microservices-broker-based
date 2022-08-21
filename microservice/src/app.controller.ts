import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateNotifyDto } from './create-notify.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('create-notification')
  createNotification(@Payload() dto: CreateNotifyDto) {
    this.appService.createNotification(dto);
  }

  @MessagePattern('get-notifications')
  getNotifications() {
    return this.appService.getNotifications();
  }
}
