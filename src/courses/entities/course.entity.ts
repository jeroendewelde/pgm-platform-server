import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Course {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'The ID of the course' })
  id: number

  @Column()
  @Field(() => String, { description: 'The name of the course' })
  name: string

  @Column()
  @Field(() => String, { description: 'The description of the course' })
  description: string

  @Column()
  @Field(() => Int, { description: 'The number of the term' })
  term: number
}
