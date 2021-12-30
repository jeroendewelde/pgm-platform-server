import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { CompaniesService } from './companies.service';
import { Company } from './entities/company.entity';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { Intern } from 'src/interns/entities/intern.entity';

@Resolver(() => Company)
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService) {}

  @Mutation(() => Company)
  createCompany(@Args('createCompanyInput') createCompanyInput: CreateCompanyInput): Promise<Company> {
    return this.companiesService.create(createCompanyInput);
  }

  @Query(() => [Company], { name: 'companies' })
  findAll(): Promise<Company[]> {
    return this.companiesService.findAll();
  }

  @Query(() => Company, { name: 'company' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Company> {
    return this.companiesService.findOneById(id);
  }

  @ResolveField(() => [Intern])
  interns(@Parent() company: Company): Promise<Intern[]> {
    return this.companiesService.findAllInterns(company.id);
  }

  @Mutation(() => Company)
  updateCompany(
    @Args('id', { type: () => Int }) 
    id: number,
    @Args('updateCompanyInput') 
    updateCompanyInput: UpdateCompanyInput
  ): Promise<Company> {
    return this.companiesService.update(id, updateCompanyInput);
  }

  @Mutation(() => Company)
  removeCompany(@Args('id', { type: () => Int }) id: number): Promise<Company> {
    const toBeDeletedCompany = this.companiesService.findOneById(id);

    if(!toBeDeletedCompany) return null
    return this.companiesService.remove(id);
  }
}
