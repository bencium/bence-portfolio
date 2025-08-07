import { PortfolioService } from '../portfolio/portfolio.service';
export declare class ProjectsController {
    private readonly portfolioService;
    constructor(portfolioService: PortfolioService);
    getProject(id: string): {
        title: string;
        description: string;
        project: import("../portfolio/portfolio.service").ProjectData;
    };
}
