import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user-input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async login(loginUserInput: LoginUserInput): Promise<any> {
  async login(user: User): Promise<any> {
    // const user = await this.usersService.findOneByUsername(loginUserInput.username);
    // const { password, ...result } = user;

    console.log('user: ', user);
    console.log('token', this.jwtService.sign({ username: user.username, sub: user.id }));
    return {
      // access_token: 'fake-token', // here comes jwt
      access_token: this.jwtService.sign({ username: user.username, sub: user.id }),
      // user: result,
      user: user,
    }
  }
}
