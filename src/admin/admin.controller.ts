import { Controller, Get, Post, Put, Delete, Body, Param, Render, Req, Res, HttpStatus, HttpException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminService } from './admin.service';
import { ProjectData } from '../portfolio/portfolio.service';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

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

  // Upload hero image for project (API)
  @Post('api/projects/:id/upload-image')
  @UseInterceptors(FileInterceptor('heroImage', { 
    storage: diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = path.join(process.cwd(), 'public', 'images', 'projects');
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `hero-${uniqueSuffix}${ext}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|webp|avif)$/)) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
  }))
  async uploadHeroImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { heroImageAlt?: string },
    @Req() req: Request
  ) {
    if (!req.session?.authenticated) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    try {
      // Get the project first to potentially remove old image
      const project = await this.adminService.getProjectById(id);
      
      // Remove old hero image if it exists
      if (project.heroImage) {
        const oldImagePath = path.join(process.cwd(), 'public', 'images', 'projects', project.heroImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Update project with new hero image
      const relativePath = file.filename;
      const updatedProject = await this.adminService.updateProject(id, {
        heroImage: relativePath,
        heroImageAlt: body.heroImageAlt || `${project.title} screenshot`
      });

      return {
        success: true,
        heroImage: relativePath,
        heroImageAlt: updatedProject.heroImageAlt
      };
    } catch (error) {
      // Clean up uploaded file if project update fails
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      throw new HttpException('Failed to upload image', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Remove hero image from project (API)
  @Delete('api/projects/:id/image')
  async removeHeroImage(@Param('id') id: string, @Req() req: Request) {
    if (!req.session?.authenticated) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    try {
      const project = await this.adminService.getProjectById(id);
      
      if (project.heroImage) {
        // Remove file from filesystem
        const imagePath = path.join(process.cwd(), 'public', 'images', 'projects', project.heroImage);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }

        // Update project to remove image references
        await this.adminService.updateProject(id, {
          heroImage: undefined,
          heroImageAlt: undefined
        });
      }

      return { success: true };
    } catch (error) {
      throw new HttpException('Failed to remove image', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}