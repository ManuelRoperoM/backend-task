import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TasksEntity } from './tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { ResponseCreateTaskDto } from './dto/response-create-task.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ResponseUpdateTaskDto } from './dto/response-update-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksEntity)
        private readonly tasksRepository: Repository<TasksEntity>,
      ) {}

      async findAll(): Promise<TasksEntity[]> {
        return this.tasksRepository.find();
      }
    
      async create(data: CreateTaskDto): Promise<ResponseCreateTaskDto> {
        const now = new Date();
        const dataSave = { ...data,
            completed: false,
            createdAt: now.toISOString().replace("T", " ")
        }
        const entity = this.tasksRepository.create(dataSave);
        const newTask = this.tasksRepository.save(entity);
        return plainToInstance(ResponseCreateTaskDto, newTask, {
          excludeExtraneousValues: true,
        })
      }

      async getFilterTasks(taskStatus): Promise<TasksEntity[]> {
        if (taskStatus) {
            if (taskStatus === 'completed') {
                return this.tasksRepository.find({
                    where: { completed:true },
                  });
            } else {
                return this.tasksRepository.find({
                    where: { completed:false },
                  });
            }
        }else {
            return this.findAll()
        }
      }

      async getTaskById(id: number): Promise<TasksEntity> {
        const task = await this.tasksRepository.findOne({
          where: {id: id}
        })
        if (!task) throw new HttpException("Tarea no encontrada", HttpStatus.NOT_FOUND)
        return task
      }

      async updateTaskById(id: number ,data: UpdateTaskDto) : Promise<ResponseUpdateTaskDto> {
        await this.tasksRepository.update(id, data)
        const updatedTask = await this.getTaskById(id);
        return plainToInstance(ResponseUpdateTaskDto, updatedTask, {
          excludeExtraneousValues: true,
        });
      }

      async deleteTaskById(id: number): Promise<unknown> {
        try {
          this.tasksRepository.delete(id);
          return {status: 'ok', msge: `Tarea con id=${id} eliminada correctamente`}
        } catch (error) {
          return { status: 'error', msge: `Error inesperado : ${error}` }
          
        }
      }

      async updateTaskStatusById(id: number, data: UpdateTaskStatusDto): Promise<ResponseUpdateTaskDto> {
        await this.tasksRepository.update(id, data)
        const updatedTask = await this.getTaskById(id);
        return plainToInstance(ResponseUpdateTaskDto, updatedTask, {
          excludeExtraneousValues: true,
        });
      }
}
