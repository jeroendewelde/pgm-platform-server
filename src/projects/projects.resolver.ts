import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';

import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { ProjectsService } from './projects.service';
import { Course } from 'src/courses/entities/course.entity';
import { Person } from 'src/persons/entities/person.entity';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { CreateAttachmentInput } from 'src/attachments/dto/create-attachment.input';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => Project)
  createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput): Promise<Project> {
    return this.projectsService.create(createProjectInput);
  }

  @Mutation(() => Project)
  addAttachmentsToProject(
    @Args('projectId', { type: () => Int }) 
    projectId: number,
    @Args('attachments', { type: () => [Int] }) 
    attachments: number[]
  ): Promise<Project> {
    return this.projectsService.addAttachmentsToProject(projectId, attachments);
  }

  @Mutation(() => Project)
  addStudentsToProject(
    @Args('projectId', { type: () => Int }) 
    projectId: number,
    @Args('studentIds', { type: () => [Int] }) 
    studentIds: number[]
  ): Promise<Project> {
    return this.projectsService.addStudentsToProject(projectId, studentIds);
  }

  @Query(() => [Project], { name: 'projects' })
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Query(() => Project, { name: 'project' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Project> {
    return this.projectsService.findOneById(id);
  }

  @ResolveField(() => [Attachment])
  attachments(
    @Parent() project: Project,
  ): Promise<Attachment[]> {
    return this.projectsService.getAttachments(project.id);
  }

  @ResolveField(() => Course)
  course(
    @Parent() project: Project,
  ): Promise<Course> {
    return this.projectsService.getCourse(project.courseId);
  }

  @ResolveField(() => [Person])
  students(
    @Parent() project: Project,
  ): Promise<Person[]> {
    return this.projectsService.getStudents(project.id);
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
