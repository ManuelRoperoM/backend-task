import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksEntity } from './tasks.entity';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { ResponseCreateTaskDto } from './dto/response-create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ResponseUpdateTaskDto } from './dto/response-update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Get()
    getTaskById(@Query('id') id?: number): Promise<unknown> {
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
    create(@Body() data: CreateTaskDto): Promise<ResponseCreateTaskDto> {
      return this.taskService.create(data);
    }

    @Put(':id')
    updateTask(  
      @Param('id') id: number,
      @Body() data: UpdateTaskDto
    ): Promise<ResponseUpdateTaskDto> {
      return this.taskService.updateTaskById(id, data);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: number): Promise<unknown> {
      return this.taskService.deleteTaskById(id);
    }
}
