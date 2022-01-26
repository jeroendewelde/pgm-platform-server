import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";

import { Course } from "src/courses/entities/course.entity";
import { PersonInformation } from "src/person-informations/entities/person-information.entity";
import { Project } from "src/projects/entities/project.entity";

import { PersonType } from "../../scalars/person-type.scalar";
import { Generation } from "src/generations/entities/generation.entity";
import { Intern } from "src/interns/entities/intern.entity";

@Entity()
@ObjectType()
export class Person {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: "The ID of the person" })
  id: number;

  @Column()
  @Field(() => String, { description: "The first name of the person" })
  firstName: string;

  @Column()
  @Field(() => String, { description: "The last name of the person" })
  lastName: string;

  @Column()
  @Field(() => PersonType, { description: "The type of the person" })
  type: PersonType;

  @Column({ nullable: true })
  @Field(() => String, {
    description: "The years this person was/is a student",
    nullable: true,
  })
  academicYear?: string;

  @Column({ nullable: true })
  @Field(() => String, {
    description: "The avatar url for the person",
    nullable: true,
  })
  avatarUrl?: string;

  // @Column({ nullable: true })
  // @Field(() => Int, {
  //   description: "The generation this students belongs to",
  //   nullable: true,
  // })
  // generationId?: number;

  // Relations
  @OneToOne(
    (type) => PersonInformation,
    (personInformation) => personInformation.person,
    {
      cascade: true,
      nullable: true,
    }
  )
  @Field((type) => PersonInformation, { nullable: true })
  personInformation?: PersonInformation;

  @OneToOne((type) => Intern, (intern) => intern.student)
  @Field((type) => Intern, { nullable: true })
  intern?: Intern;

  // @ManyToOne(() => Generation, (generation) => generation.students, {
  //   onDelete: "CASCADE",
  // })
  // @Field(() => Generation, {
  //   description: "The generation this student belongs to",
  //   nullable: true,
  // })
  // generation?: Generation;

  @ManyToMany(() => Project, (project) => project.students, { nullable: true })
  projects?: Project[];

  @ManyToMany(() => Course, (course) => course.teachers, { nullable: true })
  courses?: Course[];
}
