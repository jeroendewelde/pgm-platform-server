import { Injectable, BadRequestException, UploadedFile } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { Intern } from "src/interns/entities/intern.entity";
import { Repository } from "typeorm";
import { CreateCompanyInput } from "./dto/create-company.input";
import { UpdateCompanyInput } from "./dto/update-company.input";
import { Company } from "./entities/company.entity";

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private cloudinaryService: CloudinaryService
  ) {}

  async create(createCompanyInput: CreateCompanyInput): Promise<Company> {
    const newCompany = this.companyRepository.create(createCompanyInput);

    console.log("newCompany", newCompany);
    return this.companyRepository.save(newCompany);
  }

  async uploadImageToCloudinary(
    @UploadedFile()
    file: // file: Express.Multer.File
    any
  ) {
    return await this.cloudinaryService.uploadImage(file).catch(() => {
      throw new BadRequestException("Invalid file type.");
    });
  }

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  findOneById(id: number): Promise<Company> {
    return this.companyRepository.findOneOrFail(id);
  }

  async findAllInterns(companyId: number): Promise<Intern[]> {
    const company = await this.companyRepository.findOneOrFail(companyId, {
      relations: ["interns"],
    });

    if (company.interns) return company.interns;
    return [];
  }

  async update(id: number, updateCompanyInput: UpdateCompanyInput) {
    const { interns, ...companyObject } = updateCompanyInput;

    const updatedCompany1 = this.companyRepository.save({
      id: id,
      companyObject,
    });

    let company = await this.companyRepository.findOneOrFail(id, {
      relations: ["interns"],
    });

    company.interns = interns;

    const updatedCompany = await this.companyRepository.save({
      id: id,
      ...company,
    });
    console.log("....updated...", updatedCompany);
    return updatedCompany;
  }

  async remove(id: number): Promise<Company> {
    const company = await this.findOneById(id);
    return this.companyRepository.remove(company);
  }
}
