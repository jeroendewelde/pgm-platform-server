import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(createUserInput);
    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneById(id: number): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    return this.userRepository.save({
      id: id,
      ...updateUserInput,
    });
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOneById(id);
    return this.userRepository.remove(user);
  }
}
