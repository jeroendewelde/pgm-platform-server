import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from 'src/scalars/role.scalar';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'The ID of the user' })
  id: number

  @Column()
  @Field(() => String, { description: 'The name of the user' })
  username: string

  @Column()
  @Field(() => String, { description: 'The email of the user' })
  email: string

  @Column()
  @Field(() => String, { description: 'The password of the user' })
  password: string

  @Column()
  @Field(() => Role, { description: 'The role of the user' })
  role: Role

  // @Column()
  // @Field(() => String, { description: 'The avatar of the user' })
  // avatar: string

  // Relations
  // Optional -> user
}
