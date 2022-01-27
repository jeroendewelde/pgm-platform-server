import {
  Injectable,
  BadRequestException,
  UploadedFile,
  Inject,
  forwardRef,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
    private readonly internsService: InternsService
  ) {}

  async create(createCompanyInput: CreateCompanyInput): Promise<Company> {
    const { teaserImage, ...companyObject } = createCompanyInput;

    let newCompany: Company;

    // If image is provided, add path prefix to server & save image
    if (teaserImage) {
      const url = `${process.env.CWD}${teaserImage}`;
      return await this.companyRepository.save({
        teaserImage: url,
        ...companyObject,
      });
    } else {
      return await this.companyRepository.save({
        ...companyObject,
      });
    }
  }

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  findOneById(id: number): Promise<Company> {
    return this.companyRepository.findOne(id);
  }

  async findAllInterns(companyId: number): Promise<Intern[]> {
    const company = await this.companyRepository.findOneOrFail(companyId, {
      relations: ["interns"],
    });

    if (company.interns) return company.interns;
    return [];
  }

  async update(id: number, updateCompanyInput: UpdateCompanyInput) {
    const { teaserImage, interns, ...companyInput } = updateCompanyInput;

    let companyInfoFromDb = await this.companyRepository.findOne(id, {
      relations: ["interns"],
    });

    companyInfoFromDb?.interns.forEach(async (intern) => {
      await this.internsService.remove(intern.id);
    });

    await this.companyRepository.save(companyInfoFromDb);

    interns?.forEach(async (intern) => {
      const { id: internId, ...internInput } = intern;
      await this.internsService.create({
        companyId: id,
        ...internInput,
      });
    });

    if (teaserImage) {
      let url;

      if (teaserImage.split("http").length <= 1) {
        url = `${process.env.CWD}${teaserImage}`;
      } else url = teaserImage;

      return await this.companyRepository.save({
        id: id,
        teaserImage: url,
        ...companyInput,
      });
    } else {
      return await this.companyRepository.save({
        id: id,
        ...companyInput,
      });
    }
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
    });

    return this.companyRepository.save(company);
  }

  async remove(id: number): Promise<Company> {
    const company = await this.findOneById(id);
    if (company) {
      return this.companyRepository.remove(company);
    }
  }
}
