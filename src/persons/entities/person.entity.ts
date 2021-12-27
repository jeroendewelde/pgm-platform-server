import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PersonInformation } from 'src/person-informations/entities/person-information.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PersonType } from '../../scalars/person-type.scalar';

@Entity()
@ObjectType()
export class Person {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'The ID of the person' })
  id: number

  @Column()
  @Field(() => String, { description: 'The first name of the person' })
  firstName: string

  @Column()
  @Field(() => String, { description: 'The last name of the person' })
  lastName: string

  @Column()
  @Field(() => PersonType, { description: 'The type of the person' })
  type: PersonType

  // Relations
  @OneToOne(type => PersonInformation, personInformation => personInformation.person)
  @Field(type => PersonInformation, { nullable: true })
  personInformation?: PersonInformation
}