import { CreatePersonInput } from './create-person.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { PersonType } from 'src/scalars/person-type.scalar';

@InputType()
export class UpdatePersonInput extends PartialType(CreatePersonInput) {
}
