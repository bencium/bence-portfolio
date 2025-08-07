import { Controller, Get, Render, Param, HttpCode } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';

@Controller()
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  @Render('index')
  getHome() {
    const categories = this.portfolioService.getProjectCategories();
    const categoriesWithFeaturedProjects = categories.map(category => {
      const categoryData = this.portfolioService.getCategoryData(category.id);
      return {
        ...category,
        description: categoryData?.description || '',
        featuredProjects: this.portfolioService.getFeaturedProjectsByCategory(category.id)
          .map(project => ({
            ...project,
            shortTitle: this.getShortTitle(project.title)
          }))
      };
    });

    return {
      title: 'Bence - AI Engineer & Product Designer',
      description: 'Portfolio of Bence, AI engineer and product designer specializing in AI-first software for regulated markets',
      isHome: true,
      portfolioData: this.portfolioService.getPortfolioData(),
      projectCategories: categoriesWithFeaturedProjects,
    };
  }

  private getShortTitle(title: string): string {
    // Extract short titles for project cards
    const titleMap: { [key: string]: string } = {
      'Anna India - Psycho-Oncology RAG Chatbot': 'Anna',
      'MedHub Ecosystem - Medical Platform Suite': 'MedHub',
      'BurnOut Assistant - Tech Worker Mental Health': 'Mental',
      'AGI Detector - Emergence Monitoring System': 'AGI',
      'Agentic Design - Autonomous Creative Framework': 'Design',
      'BDS Automation - Utility Company Workflow': 'BDS',
      'Multi-Agent Customer Service System': 'Support',
      'Weather-Based Marketing Automation': 'Marketing',
      'PWA News Reader - Modern Offline App': 'PWA',
      'YelloAI - AI-Powered Directory Service': 'YelloAI',
      'PropWise - AI Property Intelligence': 'PropWise',
      'Blinds2Go - E-commerce Platform Enhancement': 'Blinds2Go',
      'Transcribe7Sec - Ultra-Fast Audio Processing': 'Audio',
      'DXF Analyzer - CAD File Intelligence': 'CAD',
      'Curato AI News - Intelligent Aggregation': 'News',
      'Review Analyser - B2B Intelligence Platform': 'Reviews',
      'Neural Design - AI-Driven Interface System': 'Neural',
      'Social Content Gen - MCP Platform': 'Content',
    };
    return titleMap[title] || title.split(' ')[0];
  }

  @Get('about')
  @Render('about')
  getAbout() {
    return {
      title: 'About - Bence Portfolio',
      description: 'Learn more about Bence, AI engineer and product designer',
      isAbout: true,
    };
  }

  @Get('health')
  @HttpCode(200)
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  // Generic category page handler
  @Get(':category-projects')
  @Render('categories/category')
  getCategoryProjects(@Param('category') category: string) {
    const categoryData = this.portfolioService.getCategoryData(category);
    const projects = this.portfolioService.getProjectsByCategory(category)
      .map(project => ({
        ...project,
        shortTitle: this.getShortTitle(project.title)
      }));

    if (!categoryData) {
      throw new Error(`Category ${category} not found`);
    }

    return {
      title: `${categoryData.name} - Bence Portfolio`,
      description: `Explore ${categoryData.name.toLowerCase()} projects by Bence`,
      category: categoryData,
      projects,
    };
  }
}