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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const portfolio_service_1 = require("../portfolio/portfolio.service");
let ProjectsController = class ProjectsController {
    constructor(portfolioService) {
        this.portfolioService = portfolioService;
    }
    getProject(id) {
        const project = this.portfolioService.getProjectById(id);
        if (!project) {
            throw new common_1.NotFoundException(`Project with id ${id} not found`);
        }
        return {
            title: `${project.title} - Bence Portfolio`,
            description: project.description,
            project,
        };
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Render)('projects/project'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getProject", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [portfolio_service_1.PortfolioService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map