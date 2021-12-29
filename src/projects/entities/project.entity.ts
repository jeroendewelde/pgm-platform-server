import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Person } from 'src/persons/entities/person.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToMany(() => Person, person => person.projects, { nullable: true })
  // @JoinTable({name: 'project_has_students', joinColumn: {name: 'project_id', referencedColumnName: 'id'}, inverseJoinColumn: {name: 'student_id', referencedColumnName: 'id'}})
  @JoinTable({name: 'projects_have_students'})
  students?: Person[]

  @ManyToMany(() => Attachment, attachment => attachment.projects, { nullable: true, cascade: true })
  @JoinTable({name: 'projects_have_attachments'})
  attachments?: Attachment[]
}
