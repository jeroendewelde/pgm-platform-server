import { registerEnumType } from "@nestjs/graphql";

export enum PersonType {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
}

registerEnumType(PersonType, {
  name: 'PersonType',
  description: 'The type of the person' 
});