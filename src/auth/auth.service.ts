import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/scalars/role.scalar';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user-input';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    const valid = await bcrypt.compare(password, user?.password);

    // if (user && user.password === password) {
    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<any> {
    return {
      access_token: this.jwtService.sign({ username: user.username, sub: user.id }),
      user: user,
    }
  }

  async signup(loginUserInput: LoginUserInput): Promise<any> {
    const user = await this.usersService.findOneByUsername(loginUserInput.username);
    console.log('user  van service.......', user);

    if(user) {
      throw new Error('User already exists');
      // replace by error from db?
    }

    const password = await bcrypt.hash(loginUserInput.password, 10);

    return this.usersService.create({
      username: loginUserInput.username,
      // email: loginUserInput.email,
      email : 'me@me.com',
      password: password,
      role: Role.ADMIN
    });

    return this.login(user);
  }
}
