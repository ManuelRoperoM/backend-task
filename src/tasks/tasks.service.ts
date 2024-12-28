import { Injectable } from '@nestjs/common';
import { TasksEntity } from './tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksEntity)
        private readonly tasksRepository: Repository<TasksEntity>,
      ) {}

      async findAll(): Promise<TasksEntity[]> {
        return this.tasksRepository.find();
      }
    
      async create(data: Partial<TasksEntity>): Promise<TasksEntity> {
        const now = new Date();
        const dataSave = { ...data,
            completed: false,
            createdAt: now.toISOString().replace("T", " ")
        }
        const entity = this.tasksRepository.create(dataSave);
        return this.tasksRepository.save(entity);
      }

}
