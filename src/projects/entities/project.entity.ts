import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from 'src/courses/entities/course.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  @Field(() => String, { description: 'The academic year of the project' })
  academicYear: string

  @Column()
  @Field(() => Int, { description: 'The ID of the course this project was made for' })
  courseId: number

  // Relations
  @ManyToOne(() => Course, course => course.projects, { onDelete: 'CASCADE' })
  @Field(() => Course, { description: 'The course this project belongs to' })
  course: Course
}
