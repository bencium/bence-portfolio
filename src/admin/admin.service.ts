import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectData } from '../portfolio/portfolio.service';
import * as fs from 'fs';
import * as path from 'path';

interface ProjectsData {
  projects: ProjectData[];
  lastUpdated: string;
}

@Injectable()
export class AdminService {
  private readonly dataFile = path.join(process.cwd(), 'data', 'projects.json');
  private readonly categories = [
    { id: 'healthcare', name: 'AI Healthcare & Medical Applications', icon: '🏥' },
    { id: 'research', name: 'AI Research & Detection Tools', icon: '🚀' },
    { id: 'automation', name: 'AI Agents & Automation', icon: '🤖' },
    { id: 'webapp', name: 'Web Applications & PWAs', icon: '🌐' },
    { id: 'business', name: 'Client Work & Business Applications', icon: '💼' },
    { id: 'tools', name: 'Development Tools & Utilities', icon: '🛠️' },
    { id: 'analytics', name: 'Data Processing & Analytics', icon: '📊' },
    { id: 'design', name: 'UI/Design & Animation Projects', icon: '🎨' },
  ];

  constructor() {
    this.ensureDataDirectory();
    this.initializeDataFile();
  }

  private ensureDataDirectory() {
    const dataDir = path.dirname(this.dataFile);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  private initializeDataFile() {
    if (!fs.existsSync(this.dataFile)) {
      // Initialize with current hardcoded projects from portfolio service
      // We'll migrate these to JSON format
      const initialData: ProjectsData = {
        projects: [], // Will be populated from existing service
        lastUpdated: new Date().toISOString()
      };
      this.writeDataFile(initialData);
    }
  }

  private readDataFile(): ProjectsData {
    try {
      const data = fs.readFileSync(this.dataFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading projects data file:', error);
      return { projects: [], lastUpdated: new Date().toISOString() };
    }
  }

  private writeDataFile(data: ProjectsData) {
    try {
      data.lastUpdated = new Date().toISOString();
      fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error('Error writing projects data file:', error);
      throw error;
    }
  }

  // Get all projects
  async getAllProjects(): Promise<ProjectData[]> {
    const data = this.readDataFile();
    return data.projects;
  }

  // Get single project by ID
  async getProjectById(id: string): Promise<ProjectData> {
    const data = this.readDataFile();
    const project = data.projects.find(p => p.id === id);
    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return project;
  }

  // Create new project
  async createProject(projectData: ProjectData): Promise<ProjectData> {
    const data = this.readDataFile();
    
    // Check if ID already exists
    const existingProject = data.projects.find(p => p.id === projectData.id);
    if (existingProject) {
      throw new Error(`Project with ID "${projectData.id}" already exists`);
    }

    // Add new project
    data.projects.push(projectData);
    this.writeDataFile(data);
    
    return projectData;
  }

  // Update existing project
  async updateProject(id: string, updates: Partial<ProjectData>): Promise<ProjectData> {
    const data = this.readDataFile();
    const projectIndex = data.projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    // Update project
    data.projects[projectIndex] = { ...data.projects[projectIndex], ...updates };
    this.writeDataFile(data);
    
    return data.projects[projectIndex];
  }

  // Delete project
  async deleteProject(id: string): Promise<void> {
    const data = this.readDataFile();
    const projectIndex = data.projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    // Remove project
    data.projects.splice(projectIndex, 1);
    this.writeDataFile(data);
  }

  // Get all categories
  async getCategories() {
    return this.categories;
  }

  // Get projects by category
  async getProjectsByCategory(category: string): Promise<ProjectData[]> {
    const data = this.readDataFile();
    return data.projects.filter(p => p.category === category);
  }

  // Get featured projects
  async getFeaturedProjects(): Promise<ProjectData[]> {
    const data = this.readDataFile();
    return data.projects.filter(p => p.featured);
  }

  // Migrate from existing portfolio service (one-time operation)
  async migrateFromPortfolioService(existingProjects: ProjectData[]): Promise<void> {
    const data = this.readDataFile();
    if (data.projects.length === 0) {
      data.projects = existingProjects;
      this.writeDataFile(data);
      console.log(`Migrated ${existingProjects.length} projects to JSON storage`);
    }
  }

  // Get statistics
  async getStatistics() {
    const data = this.readDataFile();
    const stats = {
      totalProjects: data.projects.length,
      featuredProjects: data.projects.filter(p => p.featured).length,
      projectsByCategory: {} as Record<string, number>,
      lastUpdated: data.lastUpdated
    };

    // Count projects by category
    this.categories.forEach(cat => {
      stats.projectsByCategory[cat.id] = data.projects.filter(p => p.category === cat.id).length;
    });

    return stats;
  }
}