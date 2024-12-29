import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      // secret: String(process.env.JWT_SECRET),
      secret: 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ], 
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
