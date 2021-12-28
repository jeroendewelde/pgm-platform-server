import { CreateProjectInput } from './create-project.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { ManyToOne } from 'typeorm';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'The name of the project' })
  name: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'The teaser text for the project' })
  teaserText: string
  
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'The full description of the project' })
  body: string

}
