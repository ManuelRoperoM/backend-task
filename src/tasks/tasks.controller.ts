import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksEntity } from './tasks.entity';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Get()
    getTaskById(@Query('id') id?: number): Promise<TasksEntity[]> {
        if (id) {
            return this.taskService.getTaskById(id);
        } else {
            return this.taskService.findAll();
        }
        
    }

    @Get('filter')
    getTasks(@Query('taskStatus') taskStatus?: string): Promise<TasksEntity[]> {
        if (taskStatus && taskStatus !== 'completed' && taskStatus !== 'pending') {
            throw new BadRequestException(
              `Estado invalido: ${taskStatus}. valores permitidos "completed" or "pending".`
            );
          }
        return this.taskService.getFilterTasks(taskStatus);
    }
  
    @Post()
    create(@Body() data: Partial<TasksEntity>): Promise<TasksEntity> {
      return this.taskService.create(data);
    }
}
