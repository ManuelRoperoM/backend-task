import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { ResponseLoginDto } from './dto/response-login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntity: Repository<UserEntity>,
        private jwtService: JwtService
    ) {}

      async login(data : LoginDto): Promise<ResponseLoginDto> {
        const searchUser = await this.userEntity.findOne({
            where: { name : data.name },
        });

        if(!searchUser) throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)

        const checkPassword = await compare(data.password, (await searchUser).password)

        if (!checkPassword) throw new HttpException('Contraseña incorrecta', HttpStatus.FORBIDDEN)
        
        const token = this.jwtService.sign({id:searchUser.id, name:searchUser.name})    
        return plainToInstance(ResponseLoginDto, {status: 'Correct', token: token}, {
            excludeExtraneousValues: true,
          }) 
      }
}
