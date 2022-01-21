import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Intern } from "src/interns/entities/intern.entity";
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class Company {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: "The ID of the company" })
  id: number;

  @Column()
  @Field(() => String, { description: "The name of the company" })
  name: string;

  @Column({ nullable: true })
  @Field(() => String, {
    description: "The teaser image of the company",
    nullable: true,
  })
  teaserImage?: string;

  // Relations
  @OneToMany(() => Intern, (intern) => intern.company, { cascade: true })
  @Field(() => [Intern], {
    description: "The list of interns who worked at this company",
    nullable: true,
  })
  interns?: Intern[];
}
