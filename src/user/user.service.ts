import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async findOneByUsername(name: string): Promise<UserEntity | undefined> {
        return this.userRepository.findOne({
            where: { name },  // Asegúrate de que 'username' sea el campo correcto
        });
    }

    // Puedes agregar otros métodos aquí según tus necesidades
}
