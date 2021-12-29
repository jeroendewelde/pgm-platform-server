import { ObjectType, Field, Int } from '@nestjs/graphql';
import { LearningLine } from 'src/learning-lines/entities/learning-line.entity';
import { Person } from 'src/persons/entities/person.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  @Field(() => String, { description: 'The academic year of the project' })
  academicYear: string

  @Column()
  @Field(() => Int, { description: 'The ID of the learning line this project belongs to' })
  learningLineId: number


  // Relations
  @OneToMany(type => Project, project => project.course, { cascade: true })
  @Field(type => [Project], { description: 'The List of projects made for this course', nullable: true })
  projects?: Project[]

  @ManyToMany(() => Person, person => person.courses, { nullable: true })
  @JoinTable({name: 'courses_have_teachers'})
  teachers: Person[]

  @ManyToOne(() => LearningLine, LearningLine => LearningLine.courses, { onDelete: 'CASCADE' })
  @Field(() => LearningLine, { description: 'The learning line this course belongs to' })
  learningLine: LearningLine
}
