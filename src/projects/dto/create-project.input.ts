import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateProjectInput {
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
