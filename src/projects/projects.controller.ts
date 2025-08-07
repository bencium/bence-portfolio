import { Controller, Get, Param, Render, NotFoundException } from '@nestjs/common';
import { PortfolioService } from '../portfolio/portfolio.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get(':id')
  @Render('projects/project')
  getProject(@Param('id') id: string) {
    const project = this.portfolioService.getProjectById(id);
    
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return {
      title: `${project.title} - Bence Portfolio`,
      description: project.description,
      project,
    };
  }
}