import { Controller, Get, Param, Render, NotFoundException } from '@nestjs/common';
import { PortfolioService } from '../portfolio/portfolio.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get(':id')
  @Render('projects/project')
  async getProject(@Param('id') id: string) {
    const project = await this.portfolioService.getProjectById(id);
    
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    // Get related projects from the same category
    const relatedProjects = await this.portfolioService.getRelatedProjects(id, 4);

    return {
      title: `${project.title} - Bence Portfolio`,
      description: project.description,
      project,
      relatedProjects,
    };
  }
}