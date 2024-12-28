import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksEntity } from './tasks.entity';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { ResponseCreateTaskDto } from './dto/response-create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ResponseUpdateTaskDto } from './dto/response-update-task.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';


@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener tareas por ID o todas las tareas' })
    @ApiQuery({ name: 'id', required: false, description: 'ID de la tarea' })
    @ApiResponse({
      status: 200,
      description: 'Retorna las tareas o una tarea específica.',
    })
    getTaskById(@Query('id') id?: number): Promise<unknown> {
        if (id) {
            return this.taskService.getTaskById(id);
        } else {
            return this.taskService.findAll();
        }
        
    }

    @Get('filter')
    @ApiOperation({ summary: 'Filtrar tareas por estado' })
    @ApiQuery({ 
      name: 'taskStatus', 
      required: false, 
      description: 'Estado de la tarea, puede ser "completed" o "pending".' 
    })
    @ApiResponse({
      status: 200,
      description: 'Retorna las tareas filtradas por estado.',
      type: [TasksEntity],
    })
    @ApiResponse({
      status: 400,
      description: 'Estado inválido. Los valores permitidos son "completed" o "pending".',
    })
    getTasks(@Query('taskStatus') taskStatus?: string): Promise<TasksEntity[]> {
        if (taskStatus && taskStatus !== 'completed' && taskStatus !== 'pending') {
            throw new BadRequestException(
              `Estado invalido: ${taskStatus}. valores permitidos "completed" or "pending".`
            );
          }
        return this.taskService.getFilterTasks(taskStatus);
    }
  
    @Post()
    @ApiOperation({ summary: 'Crear una nueva tarea' })
    @ApiResponse({
      status: 201,
      description: 'Tarea creada con éxito.',
      type: ResponseCreateTaskDto,
    })
    create(@Body() data: CreateTaskDto): Promise<ResponseCreateTaskDto> {
      return this.taskService.create(data);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar una tarea existente' })
    @ApiParam({ name: 'id', type: 'number', description: 'ID de la tarea a actualizar' })
    @ApiResponse({
      status: 200,
      description: 'Tarea actualizada con éxito.',
      type: ResponseUpdateTaskDto,
    })
    updateTask(  
      @Param('id') id: number,
      @Body() data: UpdateTaskDto
    ): Promise<ResponseUpdateTaskDto> {
      return this.taskService.updateTaskById(id, data);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una tarea por ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'ID de la tarea a eliminar' })
    @ApiResponse({
      status: 200,
      description: 'Tarea eliminada con éxito.',
    })
    deleteTask(@Param('id') id: number): Promise<unknown> {
      return this.taskService.deleteTaskById(id);
    }
}
