import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksEntity } from './tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [TypeOrmModule.forFeature([TasksEntity])]
})
export class TasksModule {}
