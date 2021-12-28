import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Project {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'The ID of the project' })
  id: number

  @Column()
  @Field(() => String, { description: 'The name of the project' })
  name: string

  @Column()
  @Field(() => String, { description: 'The teaser text for the project' })
  teaserText: string
  
  @Column()
  @Field(() => String, { description: 'The full description of the project' })
  body: string

  //TODO: academic year
}
