import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Intern } from 'src/interns/entities/intern.entity';
import { Repository } from 'typeorm';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  create(createCompanyInput: CreateCompanyInput): Promise<Company> {
    const newCompany = this.companyRepository.create(createCompanyInput);
    return this.companyRepository.save(newCompany);
  }

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  findOneById(id: number): Promise<Company> {
    return this.companyRepository.findOneOrFail(id);
  }

  async findAllInterns(companyId: number): Promise<Intern[]> {
    const company = await this.companyRepository.findOneOrFail(companyId, {
      relations: ['interns'],
    });

    if(company.interns) return company.interns;
    return [];
  }

  update(id: number, updateCompanyInput: UpdateCompanyInput) {
    return this.companyRepository.save({
      id: id,
      ...updateCompanyInput,
    });
  }

  async remove(id: number): Promise<Company> {
    const company = await this.findOneById(id);
    return this.companyRepository.remove(company);
  }
}
