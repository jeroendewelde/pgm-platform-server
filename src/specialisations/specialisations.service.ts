import { Injectable } from '@nestjs/common';
import { CreateSpecialisationInput } from './dto/create-specialisation.input';
import { UpdateSpecialisationInput } from './dto/update-specialisation.input';

@Injectable()
export class SpecialisationsService {
  create(createSpecialisationInput: CreateSpecialisationInput) {
    return 'This action adds a new specialisation';
  }

  findAll() {
    return `This action returns all specialisations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} specialisation`;
  }

  update(id: number, updateSpecialisationInput: UpdateSpecialisationInput) {
    return `This action updates a #${id} specialisation`;
  }

  remove(id: number) {
    return `This action removes a #${id} specialisation`;
  }
}
