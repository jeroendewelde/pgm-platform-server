import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  create(createProjectInput: CreateProjectInput): Promise<Project> {
    const newProject = this.projectRepository.create(createProjectInput);
    return this.projectRepository.save(newProject);
  }

  findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  findOneById(id: number): Promise<Project> {
    return this.projectRepository.findOneOrFail(id);
  }

  update(id: number, updateProjectInput: UpdateProjectInput): Promise<Project> {
    return this.projectRepository.save({
      id: id,
      ...updateProjectInput,
    })
  }

  async remove(id: number): Promise<Project> {
    const project = await this.findOneById(id);
    return this.projectRepository.remove(project);
  }
}
