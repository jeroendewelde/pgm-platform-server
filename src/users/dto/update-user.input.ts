import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Role } from 'src/scalars/role.scalar';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int, { description: 'The ID of the user' })
  id: number

  @Field(() => String, { description: 'The name of the user' })
  username: string

  @Field(() => String, { description: 'The email of the user' })
  email: string

  @Field(() => String, { description: 'The password of the user' })
  password: string

  @Field(() => Role, { description: 'The role of the user' })
  role: Role
}
