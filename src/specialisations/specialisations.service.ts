import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpecialisationInput } from './dto/create-specialisation.input';
import { UpdateSpecialisationInput } from './dto/update-specialisation.input';
import { Specialisation } from './entities/specialisation.entity';

@Injectable()
export class SpecialisationsService {
  constructor(
    @InjectRepository(Specialisation)
    private readonly specialisationRepository: Repository<Specialisation>,
  ) {}

  create(createSpecialisationInput: CreateSpecialisationInput): Promise<Specialisation> {
    const newSpecialisation = this.specialisationRepository.create(createSpecialisationInput);
    return this.specialisationRepository.save(newSpecialisation);
  }

  findAll(): Promise<Specialisation[]> {
    return this.specialisationRepository.find();
  }

  findOneById(id: number): Promise<Specialisation> {
    return this.specialisationRepository.findOneOrFail(id);
  }

  update(id: number, updateSpecialisationInput: UpdateSpecialisationInput): Promise<Specialisation> {
    return this.specialisationRepository.save({
      id: id,
      ...updateSpecialisationInput,
    })
  }

  async remove(id: number): Promise<Specialisation> {
    const specialisation = await this.findOneById(id);
    return this.specialisationRepository.remove(specialisation);
  }
}
