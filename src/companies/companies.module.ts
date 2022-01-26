import { forwardRef, Module } from "@nestjs/common";
import { CompaniesService } from "./companies.service";
import { CompaniesResolver } from "./companies.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "./entities/company.entity";
import { PersonsModule } from "src/persons/persons.module";
import { InternsModule } from "src/interns/interns.module";

@Module({
  imports: [TypeOrmModule.forFeature([Company]), InternsModule],
  providers: [CompaniesResolver, CompaniesService],
})
export class CompaniesModule {}
