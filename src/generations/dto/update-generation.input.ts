import { CreateGenerationInput } from './create-generation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

@InputType()
export class UpdateGenerationInput extends PartialType(CreateGenerationInput) {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'The name of the generation' })
  name: string

  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  @MaxLength(9)
  @Matches(/20[0-9]{2}-20[0-9]{2}/, {message: "The academic year must be in format '2020-2021'"})
  @Field(() => String, { description: 'The years of the generation' })
  years: string
}
