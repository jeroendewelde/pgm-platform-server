import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SocialMediaPlatform } from 'src/scalars/social-media-platform.scalar';
import { PersonInformation } from 'src/person-informations/entities/person-information.entity';
import { Person } from 'src/persons/entities/person.entity';

@Entity()
@ObjectType()
export class SocialMedia {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'The ID of this social media information' })
  id: number

  @Column()
  @Field(() => String, { description: 'The name of the social media platform' })
  platform: SocialMediaPlatform

  @Column()
  @Field(() => String, { description: 'The URL of the social media' })
  url: string

  @Column()
  @Field(type => Int, { description: 'The ID of the person this social media belongs to' })
  personId: number;

  // Relations
  @ManyToOne(() => PersonInformation, person => person.socialMedias, { onDelete: 'CASCADE' })
  @Field(() => PersonInformation, { description: 'The person this social media belongs to' })
  person: PersonInformation

}
