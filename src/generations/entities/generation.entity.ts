import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Person } from "src/persons/entities/person.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Generation {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: "The ID of the generation" })
  id: number;

  @Column()
  @Field(() => String, { description: "The name of the generation" })
  name: string;

  @Column()
  @Field(() => String, { description: "The years of the generation" })
  years: string;

  // Relations
  // @OneToMany(type => Person, person => person.generation, { cascade: true })
  // @Field(type => [Person], { description: 'The List of students in this generation' })
  // students: Person[]
}
