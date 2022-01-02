import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    
  ],
  providers: [
    UsersResolver, 
    UsersService, 
    // JwtStrategy
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}
