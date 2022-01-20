import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Testimonial {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: "The ID of the testimonial" })
  id: number;

  @Column()
  @Field(() => String, { description: "The quote" })
  quote: string;

  @Column({ nullable: true })
  @Field(() => String, {
    description: "The name of the writer",
    nullable: true,
  })
  name?: string;

  @Column({ nullable: true })
  @Field(() => String, { description: "The related company", nullable: true })
  company?: string;
}
