import { registerEnumType } from "@nestjs/graphql";

export enum Role {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  LINEADMIN = 'LINEADMIN',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'The role of the user' 
});