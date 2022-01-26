import { Module } from "@nestjs/common";
import { InternsService } from "./interns.service";
import { InternsResolver } from "./interns.resolver";
import { Intern } from "./entities/intern.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonsModule } from "src/persons/persons.module";

@Module({
  imports: [TypeOrmModule.forFeature([Intern]), PersonsModule],
  providers: [InternsResolver, InternsService],
  exports: [InternsService],
})
export class InternsModule {}
