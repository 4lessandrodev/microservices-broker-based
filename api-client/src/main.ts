import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import HttpExceptionFilter from './exception-filters/exception.filter';
import TimeoutInterceptor from './interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TimeoutInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
