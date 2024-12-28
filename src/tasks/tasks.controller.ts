import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksEntity } from './tasks.entity';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Get()
    findAll(): Promise<TasksEntity[]> {
      return this.taskService.findAll();
    }
  
    @Post()
    create(@Body() data: Partial<TasksEntity>): Promise<TasksEntity> {
      return this.taskService.create(data);
    }
}
