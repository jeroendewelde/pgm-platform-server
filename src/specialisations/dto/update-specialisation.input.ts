import { CreateSpecialisationInput } from './create-specialisation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSpecialisationInput extends PartialType(CreateSpecialisationInput) {
  @Field(() => Int)
  id: number;
}
