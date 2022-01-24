import {
  Injectable,
  BadRequestException,
  UploadedFile,
  Inject,
  forwardRef,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { Intern } from "src/interns/entities/intern.entity";
import { InternsService } from "src/interns/interns.service";
import { PersonsService } from "src/persons/persons.service";
import { Repository } from "typeorm";
import { CreateCompanyInput } from "./dto/create-company.input";
import { UpdateCompanyInput } from "./dto/update-company.input";
import { Company } from "./entities/company.entity";

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private cloudinaryService: CloudinaryService,
    private readonly internsService: InternsService
  ) {}

  async create(createCompanyInput: CreateCompanyInput): Promise<Company> {
    console.log("inpu...", createCompanyInput);
    const newCompany = this.companyRepository.save(createCompanyInput);

    // console.log("newCompany", newCompany);
    // return this.companyRepository.save(newCompany);
    return newCompany;
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

  // async update(id: number, updateCompanyInput: UpdateCompanyInput) {
  // const { internIds, ...companyObject } = updateCompanyInput;
  // await this.updateinternsInCompany(id, internIds);
  // // }
  // return this.companyRepository.save({
  //   id: id,
  //   ...companyObject,
  // });
  // }
  //   const { interns, ...companyObject } = updateCompanyInput;

  //   const updatedCompany1 = this.companyRepository.save({
  //     id: id,
  //     companyObject,
  //   });

  //   let company = await this.companyRepository.findOneOrFail(id, {
  //     relations: ["interns"],
  //   });

  //   company.interns = [];

  //   const updatedCompany2 = await this.companyRepository.save({
  //     id: id,
  //     ...company,
  //   });

  //   company.interns = interns;

  //   const updatedCompany3 = await this.companyRepository.save({
  //     id: id,
  //     ...company,
  //   });
  //   console.log("....updated...", updatedCompany3);
  //   return updatedCompany3;
  // }
  async update(id: number, updateCompanyInput: UpdateCompanyInput) {
    console.log("input..", updateCompanyInput);
    const { interns, ...companyInput } = updateCompanyInput;

    interns.forEach(async (intern) => {
      if (intern.id) {
        // const { id: , ...internInput } = intern;
        await this.internsService.remove(intern.id);
      }
      // await this.internsService.create({
      //   companyId: id,
      //   ...intern,
      // });
    });

    const updatedCompany = this.companyRepository.save({
      id: id,
      ...updateCompanyInput,
    });

    // const { interns, ...companyObject } = updateCompanyInput;

    // const updatedCompany1 = this.companyRepository.save({
    //   id: id,
    //   companyObject,
    // });

    // let company = await this.companyRepository.findOneOrFail(id, {
    //   relations: ["interns"],
    // });

    // company.interns = [];

    // const updatedCompany2 = await this.companyRepository.save({
    //   id: id,
    //   ...company,
    // });

    // company.interns = interns;

    // const updatedCompany3 = await this.companyRepository.save({
    //   id: id,
    //   ...company,
    // });
    // console.log("....updated...", updatedCompany3);
    // return updatedCompany3;
    return updatedCompany;
  }

  async updateinternsInCompany(
    companyId: number,
    internIds: number[]
  ): Promise<Company> {
    const company = await this.companyRepository.findOneOrFail(companyId, {
      relations: ["interns"],
    });

    company.interns = [];

    internIds.forEach(async (internId) => {
      const intern = await this.internsService.findOneById(internId);

      if (intern) {
        company.interns.push(intern);
      }
      // if (!course.teachers.includes(teacher)) course.teachers.push(teacher);
    });

    return this.companyRepository.save(company);
  }

  async remove(id: number): Promise<Company> {
    const company = await this.findOneById(id);
    return this.companyRepository.remove(company);
  }
}
