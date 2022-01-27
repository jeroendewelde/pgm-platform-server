import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Company } from "src/companies/entities/company.entity";
import { Person } from "src/persons/entities/person.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class Intern {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: "The ID of the intern" })
  id: number;

  @Column({ nullable: true })
  @Field(() => String, {
    description: "The name of the function",
    nullable: true,
  })
  function: string;

  @Column({ nullable: true })
  @Field(() => String, {
    description: "The description of the function",
    nullable: true,
  })
  description?: string;

  @Column()
  @Field(() => String, { description: "The year of the internship" })
  year: string;

  @Column()
  @Field(() => Int, {
    description: "The ID of the person this intern belongs to",
  })
  studentId: number;

  @Column({ nullable: true })
  @Field(() => Int, {
    description: "The ID of the company this intern worked at",
    nullable: true,
  })
  companyId?: number;

  // Relations
  @OneToOne(() => Person, (person) => person.intern, {
    onDelete: "CASCADE",
    cascade: true,
  })
  @JoinColumn()
  @Field(() => Person, {
    description: "The student this intern belongs to",
  })
  student: Person;

  @ManyToOne(() => Company, (company) => company.interns, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @Field(() => Company, {
    description: "The company this intern worked at",
    nullable: true,
  })
  company?: Company[];
}
