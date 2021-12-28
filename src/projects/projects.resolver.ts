import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';

import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { ProjectsService } from './projects.service';
import { Course } from 'src/courses/entities/course.entity';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => Project)
  createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput): Promise<Project> {
    return this.projectsService.create(createProjectInput);
  }

  @Query(() => [Project], { name: 'projects' })
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Query(() => Project, { name: 'project' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Project> {
    return this.projectsService.findOneById(id);
  }

  @ResolveField(() => Course)
  course(
    @Parent() project: Project,
  ): Promise<Course> {
    return this.projectsService.getCourse(project.courseId);
  }

  @Mutation(() => Project)
  updateProject(
    @Args('id', { type: () => Int }) 
    id: number,
    @Args('updateProjectInput') 
    updateProjectInput: UpdateProjectInput
  ): Promise<Project> {
    return this.projectsService.update(id, updateProjectInput);
  }

  @Mutation(() => Project)
  removeProject(@Args('id', { type: () => Int }) id: number): Promise<Project> {
    const toBeDeletedProject = this.projectsService.findOneById(id);

    if(!toBeDeletedProject) return null
    return this.projectsService.remove(id)
  }
}
