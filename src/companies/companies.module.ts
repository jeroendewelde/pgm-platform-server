import { Module } from "@nestjs/common";
import { CompaniesService } from "./companies.service";
import { CompaniesResolver } from "./companies.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "./entities/company.entity";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";

@Module({
  imports: [TypeOrmModule.forFeature([Company]), CloudinaryModule],
  providers: [CompaniesResolver, CompaniesService],
})
export class CompaniesModule {}
