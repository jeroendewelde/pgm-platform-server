import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';



@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Mutation(() => User)
  // createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
  //   return this.usersService.create(createUserInput);
  // }

  
  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  // findAll(): Promise<User[]> {
  findAll(@Context() context): Promise<User[]> {
    console.log('context', context);
    // in context will be the user which is given from the strategy
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => Int }) 
    id: number,
    @Args('updateUserInput') 
    updateUserInput: UpdateUserInput
  ): Promise<User> {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    const toBeDeletedUser = this.usersService.findOneById(id);

    if(!toBeDeletedUser) return null
    return this.usersService.remove(id);
  }
}
