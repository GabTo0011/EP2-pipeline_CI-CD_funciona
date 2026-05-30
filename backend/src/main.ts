import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  
  // obtenemos el servicio de configuración 'configService' del configModule
  const configService = app.get(ConfigService);

  // buscamos el valor del puerto desde .env con 'configService'
  const PORT = configService.get<string>('PORT') || '3000';

  // usamos puerto obtenido desde .env
  await app.listen(PORT);

  console.log(`Server is running on port ${PORT}`);
  
}
bootstrap();
