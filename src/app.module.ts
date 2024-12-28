import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './tasks/tasks.entity';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'task_manager',
    entities: [TasksEntity, UserEntity],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([TasksEntity, UserEntity]), 
    TasksModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
