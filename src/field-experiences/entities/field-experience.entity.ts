import { ObjectType, Field, Int } from "@nestjs/graphql";
import { PersonInformation } from "src/person-informations/entities/person-information.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class FieldExperience {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String, { description: "The ID of the field experience" })
  id: string;

  @Column({ nullable: true })
  @Field(() => String, {
    description: "The duration of the field experience",
    nullable: true,
  })
  duration?: string;

  @Column({ nullable: true })
  @Field(() => String, {
    description: "The name of the company",
    nullable: true,
  })
  company?: string;

  @Column({ nullable: true })
  @Field(() => String, {
    description: "The performed function",
    nullable: true,
  })
  function?: string;

  @Column({ nullable: true })
  @Field(() => String, {
    description: "The description of the field experience",
    nullable: true,
  })
  description?: string;

  @Column()
  @Field((type) => Int)
  personId: number;

  // Relations
  @ManyToOne(() => PersonInformation, (person) => person.fieldExperiences, {
    onDelete: "CASCADE",
  })
  @Field(() => PersonInformation, {
    description: "The person this field experience belongs to",
  })
  person: PersonInformation;
}
