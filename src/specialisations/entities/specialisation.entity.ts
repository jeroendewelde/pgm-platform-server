import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from 'src/courses/entities/course.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Specialisation {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'The ID of the specialisation' })
  id: number

  @Column()
  @Field(() => String, { description: 'The name of the specialisation' })
  name: string

  @Column()
  @Field(() => String, { description: 'The academic year of this specialisation' })
  academicYear: string

  // Relations
  @OneToMany(type => Course, course => course.specialisation, { cascade: true, nullable: true })
  @Field(type => [Course], { description: 'The List of courses made for this specialisation', nullable: true })
  courses?: Course[]
}
