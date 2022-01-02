import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInternInput } from './dto/create-intern.input';
import { UpdateInternInput } from './dto/update-intern.input';
import { Intern } from './entities/intern.entity';

@Injectable()
export class InternsService {
  constructor(
    @InjectRepository(Intern)
    private readonly internRepository: Repository<Intern>,
  ) {}

  create(createInternInput: CreateInternInput): Promise<Intern> {
    const newIntern = this.internRepository.create(createInternInput);
    return this.internRepository.save(newIntern);
  }

  findAll(): Promise<Intern[]> {
    return this.internRepository.find();
  }

  findOneById(id: number): Promise<Intern> {
    return this.internRepository.findOneOrFail(id, {
      relations: ['student'],
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
    return this.internRepository.remove(intern);
  }
}
