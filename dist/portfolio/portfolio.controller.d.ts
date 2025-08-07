import { PortfolioService } from './portfolio.service';
export declare class PortfolioController {
    private readonly portfolioService;
    constructor(portfolioService: PortfolioService);
    getHome(): {
        title: string;
        description: string;
        isHome: boolean;
        portfolioData: {
            name: string;
            title: string;
            description: string;
            stats: {
                healthcare: number;
                automation: number;
                webapp: number;
                business: number;
                totalProjects: number;
            };
        };
        projectCategories: {
            description: any;
            featuredProjects: {
                shortTitle: string;
                id: string;
                title: string;
                description: string;
                category: string;
                featured: boolean;
                technologies: string[];
                link?: string;
            }[];
            id: string;
            name: string;
            count: string;
            icon: string;
        }[];
    };
    private getShortTitle;
    getAbout(): {
        title: string;
        description: string;
        isAbout: boolean;
    };
    getHealth(): {
        status: string;
        timestamp: string;
        uptime: number;
    };
    getCategoryProjects(category: string): {
        title: string;
        description: string;
        category: {
            description: any;
            id: string;
            name: string;
            count: string;
            icon: string;
        };
        projects: {
            shortTitle: string;
            id: string;
            title: string;
            description: string;
            category: string;
            featured: boolean;
            technologies: string[];
            link?: string;
        }[];
    };
}
