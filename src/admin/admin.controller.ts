import { Controller, Get, Post, Put, Delete, Body, Param, Render, Req, Res, HttpStatus, HttpException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ProjectData } from '../portfolio/portfolio.service';
import { Request, Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Admin dashboard
  @Get()
  @Render('admin/dashboard')
  async getDashboard(@Req() req: Request) {
    // Simple password check - in production, use proper auth
    const isAuthenticated = req.session?.authenticated;
    if (!isAuthenticated) {
      return { needsAuth: true };
    }

    const projects = await this.adminService.getAllProjects();
    const categories = await this.adminService.getCategories();
    
    return {
      projects,
      categories,
      totalProjects: projects.length
    };
  }

  // Login form
  @Get('login')
  @Render('admin/login')
  getLogin() {
    return {};
  }

  // Handle login
  @Post('login')
  async login(@Body() body: { password: string }, @Req() req: Request, @Res() res: Response) {
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'; // Change in production!
    
    if (body.password === adminPassword) {
      req.session.authenticated = true;
      return res.redirect('/admin');
    }
    
    return res.render('admin/login', { error: 'Invalid password' });
  }

  // Logout
  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.authenticated = false;
    return res.redirect('/admin/login');
  }

  // Get all projects (API)
  @Get('api/projects')
  async getProjects(@Req() req: Request) {
    if (!req.session?.authenticated) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.adminService.getAllProjects();
  }

  // Get single project (API)
  @Get('api/projects/:id')
  async getProject(@Param('id') id: string, @Req() req: Request) {
    if (!req.session?.authenticated) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.adminService.getProjectById(id);
  }

  // Create project (API)
  @Post('api/projects')
  async createProject(@Body() projectData: ProjectData, @Req() req: Request) {
    if (!req.session?.authenticated) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    
    // Generate ID from title if not provided
    if (!projectData.id) {
      projectData.id = projectData.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
    }
    
    return this.adminService.createProject(projectData);
  }

  // Update project (API)
  @Put('api/projects/:id')
  async updateProject(
    @Param('id') id: string,
    @Body() projectData: Partial<ProjectData>,
    @Req() req: Request
  ) {
    if (!req.session?.authenticated) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.adminService.updateProject(id, projectData);
  }

  // Delete project (API)
  @Delete('api/projects/:id')
  async deleteProject(@Param('id') id: string, @Req() req: Request) {
    if (!req.session?.authenticated) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.adminService.deleteProject(id);
  }

  // Get categories (API)
  @Get('api/categories')
  async getCategories(@Req() req: Request) {
    if (!req.session?.authenticated) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.adminService.getCategories();
  }
}