import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Person } from 'src/persons/entities/person.entity';
import { SocialMedia } from 'src/social-medias/entities/social-media.entity';
import { FieldExperience } from 'src/field-experiences/entities/field-experience.entity';

@Entity()
@ObjectType()
export class PersonInformation {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'The ID of the person information' })
  id: number

  @Column()
  @Field(() => String, { description: 'The quote for this person', nullable: true })
  quote?: string

  @Column()
  @Field(() => String, { description: 'The bio for this person', nullable: true })
  bio?: string

  @Column({ type: 'timestamp'})
  @Field()
  dob?: Date;

  @Column()
  @Field(type => Int, { description: 'The ID of the person this information belongs to' })
  personId: number;

  // Relations
  @OneToOne(type => Person, person => person.personInformation, { cascade: true })
  @JoinColumn()
  @Field(type => Person, { nullable: true, description: 'The person this person information belongs to' })
  person: Person;

  @OneToMany(() => SocialMedia, socialMedia => socialMedia.person, { cascade: true })
  @Field(type => [SocialMedia], { nullable: true, description: 'List of social media for this person' })
  socialMedias?: SocialMedia[];

  @OneToMany(() => FieldExperience, fieldExperience => fieldExperience.person, { cascade: true })
  @Field(type => [FieldExperience], { nullable: true, description: 'List of field experiences for this person' })
  fieldExperiences?: FieldExperience[];

}
