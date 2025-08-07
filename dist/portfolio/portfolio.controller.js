"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioController = void 0;
const common_1 = require("@nestjs/common");
const portfolio_service_1 = require("./portfolio.service");
let PortfolioController = class PortfolioController {
    constructor(portfolioService) {
        this.portfolioService = portfolioService;
    }
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
    getShortTitle(title) {
        const titleMap = {
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
    getAbout() {
        return {
            title: 'About - Bence Portfolio',
            description: 'Learn more about Bence, AI engineer and product designer',
            isAbout: true,
        };
    }
    getHealth() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        };
    }
    getCategoryProjects(category) {
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
};
exports.PortfolioController = PortfolioController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "getHome", null);
__decorate([
    (0, common_1.Get)('about'),
    (0, common_1.Render)('about'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "getAbout", null);
__decorate([
    (0, common_1.Get)('health'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "getHealth", null);
__decorate([
    (0, common_1.Get)(':category-projects'),
    (0, common_1.Render)('categories/category'),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "getCategoryProjects", null);
exports.PortfolioController = PortfolioController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [portfolio_service_1.PortfolioService])
], PortfolioController);
//# sourceMappingURL=portfolio.controller.js.map