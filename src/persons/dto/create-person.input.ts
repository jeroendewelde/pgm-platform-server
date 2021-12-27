import { InputType, Int, Field } from '@nestjs/graphql';
import { PersonType } from 'src/scalars/person-type.scalar';

import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePersonInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'The first name of the person' })
  firstName: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'The last name of the person' })
  lastName: string

  @IsNotEmpty()
  @IsString()
  @Field(() => PersonType, { description: 'The type of the person' })
  type: PersonType
}
