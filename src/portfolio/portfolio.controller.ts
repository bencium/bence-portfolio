import { Controller, Get, Render, Param, Query, HttpCode } from '@nestjs/common';
import { PortfolioService, ProjectSearchQuery } from './portfolio.service';

@Controller()
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  @Render('index')
  async getHome(
    @Query('search') search?: string, 
    @Query('category') category?: string, 
    @Query('tech') tech?: string
  ) {
    // Ensure query has default values
    const searchQuery = {
      search: search || '',
      category: category || '',
      tech: tech || ''
    };
    console.log('Debug - Individual params:', { search, category, tech });
    console.log('Debug - Received query params:', searchQuery);
    
    const categories = this.portfolioService.getProjectCategories();
    const allCategories = await this.portfolioService.getCategoriesWithCounts();
    const allTechnologies = await this.portfolioService.getAllTechnologies();
    
    console.log('Debug - Categories count:', allCategories.length);
    console.log('Debug - Technologies count:', allTechnologies.length);
    console.log('Debug - First few categories:', allCategories.slice(0, 2));
    console.log('Debug - First few technologies:', allTechnologies.slice(0, 5));

    // If there are query parameters, filter the projects
    const hasFilters = !!(searchQuery.search || searchQuery.category || searchQuery.tech);
    console.log('Debug - searchQuery:', searchQuery);
    console.log('Debug - hasFilters:', hasFilters);
    const filteredProjects = hasFilters ? 
      (await this.portfolioService.searchProjects(searchQuery)).map(project => ({
        ...project,
        shortTitle: this.getShortTitle(project.title)
      })) : 
      null;
      
    if (hasFilters) {
      console.log('Debug - Filtered projects count:', filteredProjects.length);
    }

    // Build categories with featured projects (for default view)
    const categoriesWithFeaturedProjects = await Promise.all(categories.map(async category => {
      const categoryData = this.portfolioService.getCategoryData(category.id);
      const featuredProjects = await this.portfolioService.getFeaturedProjectsByCategory(category.id);
      return {
        ...category,
        description: categoryData?.description || '',
        featuredProjects: featuredProjects.map(project => ({
          ...project,
          shortTitle: this.getShortTitle(project.title)
        }))
      };
    }));

    const result = {
      title: 'Bence - AI Engineer & Product Designer',
      description: 'Portfolio of Bence, AI engineer and product designer specializing in AI-first software for regulated markets',
      isHome: true,
      portfolioData: this.portfolioService.getPortfolioData(),
      projectCategories: categoriesWithFeaturedProjects,
      // Search/filter data
      categories: allCategories,
      technologies: allTechnologies,
      filteredProjects,
      hasFilters,
      query: searchQuery,
      // Debug info
      debugInfo: {
        queryKeys: Object.keys(searchQuery),
        hasFiltersType: typeof hasFilters,
        hasFiltersValue: hasFilters,
        querySearchValue: searchQuery.search,
      }
    };
    
    console.log('Debug - Final result categories length:', result.categories.length);
    console.log('Debug - Final result technologies length:', result.technologies.length);
    console.log('Debug - hasFilters value:', result.hasFilters);
    console.log('Debug - query object:', result.query);
    console.log('Debug - All result keys:', Object.keys(result));
    
    return result;
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
  async getCategoryProjects(@Param('category') category: string, @Query() query: ProjectSearchQuery) {
    const categoryData = this.portfolioService.getCategoryData(category);
    
    if (!categoryData) {
      throw new Error(`Category ${category} not found`);
    }

    // Apply search filters within the category
    const searchQuery = { ...query, category };
    const projects = (await this.portfolioService.searchProjects(searchQuery))
      .map(project => ({
        ...project,
        shortTitle: this.getShortTitle(project.title)
      }));

    return {
      title: `${categoryData.name} - Bence Portfolio`,
      description: `Explore ${categoryData.name.toLowerCase()} projects by Bence`,
      category: categoryData,
      projects,
    };
  }

  // API Endpoints
  @Get('api/projects')
  async getProjectsApi(@Query() query: ProjectSearchQuery) {
    const projects = await this.portfolioService.searchProjects(query);
    return {
      projects,
      total: projects.length,
      query,
    };
  }

  @Get('api/categories')
  async getCategoriesApi() {
    const categories = await this.portfolioService.getCategoriesWithCounts();
    return {
      categories,
      total: categories.length,
    };
  }

  @Get('api/search/technologies')
  async getTechnologiesApi() {
    const technologies = await this.portfolioService.getAllTechnologies();
    return {
      technologies,
      total: technologies.length,
    };
  }

  @Get('debug/template-data')
  async getTemplateDebug() {
    const allCategories = await this.portfolioService.getCategoriesWithCounts();
    const allTechnologies = await this.portfolioService.getAllTechnologies();
    return {
      categoriesCount: allCategories.length,
      technologiesCount: allTechnologies.length,
      categories: allCategories,
      technologies: allTechnologies.slice(0, 10)
    };
  }

  @Get('test-query')
  testQuery(@Query('search') search?: string, @Query('category') category?: string) {
    return {
      received_search: search || 'empty',
      received_category: category || 'empty',
      working: true
    };
  }
}