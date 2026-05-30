import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule, // permite usar var de entorno en todo el proyecto
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
