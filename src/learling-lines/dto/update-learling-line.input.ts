import { CreateLearlingLineInput } from './create-learling-line.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLearlingLineInput extends PartialType(CreateLearlingLineInput) {
  @Field(() => Int)
  id: number;
}
