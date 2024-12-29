import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './tasks/tasks.entity';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    port: parseInt(process.env.DB_PORT, 10),
    host: String(process.env.DB_HOST),
    database: String(process.env.DB_DATABASE),
    entities: [TasksEntity, UserEntity],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([TasksEntity, UserEntity]), 
    TasksModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}


