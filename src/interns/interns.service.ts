import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateInternInput } from "./dto/create-intern.input";
import { UpdateInternInput } from "./dto/update-intern.input";
import { Intern } from "./entities/intern.entity";

@Injectable()
export class InternsService {
  constructor(
    @InjectRepository(Intern)
    private readonly internRepository: Repository<Intern>
  ) {}

  async create(createInternInput: CreateInternInput): Promise<Intern> {
    const newIntern = await this.internRepository.create(createInternInput);
    return await this.internRepository.save(newIntern);
  }

  findAll(): Promise<Intern[]> {
    return this.internRepository.find();
  }

  findAllByCompanyId(companyId: number): Promise<Intern[]> {
    return this.internRepository.find({
      where: {
        companyId,
      },
    });
  }

  findByStudentId(studentId: number): Promise<Intern[]> {
    return this.internRepository.find({
      where: {
        studentId,
      },
    });
  }

  findOneById(id: number): Promise<Intern> {
    return this.internRepository.findOneOrFail(id, {
      relations: ["student"],
    });
  }

  update(id: number, updateInternInput: UpdateInternInput): Promise<Intern> {
    return this.internRepository.save({
      id: id,
      ...updateInternInput,
    });
  }

  async remove(id: number): Promise<Intern> {
    const intern = await this.findOneById(id);
    if (intern) {
      return await this.internRepository.remove(intern);
    } else return;
  }
}
