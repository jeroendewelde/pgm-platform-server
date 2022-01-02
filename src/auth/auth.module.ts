import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      signOptions: { expiresIn: '1h' },
      secret: 'secret', // TODO: move to env
    }),
    PassportModule,
    UsersModule,
  ],
  providers: [
    AuthService, 
    AuthResolver,
    JwtStrategy, 
    LocalStrategy,
  ]
})
export class AuthModule {}
