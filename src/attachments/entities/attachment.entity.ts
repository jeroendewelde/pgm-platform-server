import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from 'src/courses/entities/course.entity';
import { Project } from 'src/projects/entities/project.entity';
import { AttachmentType } from 'src/scalars/attachment-type.scalar';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Attachment {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'The ID of the attachment' })
  id: number

  @Column()
  @Field(() => String, { description: 'The name of the attachment' })
  name: string

  // @Column()
  // @Field(() => String, { description: 'The description of the attachment' })
  // description: string

  @Column()
  @Field(() => String, { description: 'The url of the attachment' })
  url: string

  @Column()
  @Field(() => String, { description: 'The type of the attachment' })
  type: AttachmentType

  // Relations
  @ManyToMany(() => Project, project => project.attachments )
  projects: Project[]

  @ManyToMany(() => Course, course => course.attachments)
  courses: Course[]
}
