import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from 'src/courses/entities/course.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class LearningLine {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'The ID of the learning line' })
  id: number

  @Column()
  @Field(() => String, { description: 'The name of the learning line' })
  name: string

  @Column()
  @Field(() => String, { description: 'The color of the learning line'})
  color: string

  // Teacher responsive relation?

  // Relations
  @OneToMany(type => Course, course => course.learningLine, { cascade: true })
  @Field(type => [Course], { description: 'The List of courses made for this learning line' })
  courses: Course[]
}
