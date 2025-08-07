export interface ProjectData {
    id: string;
    title: string;
    description: string;
    category: string;
    featured: boolean;
    technologies: string[];
    link?: string;
}
export declare class PortfolioService {
    private portfolioData;
    private projects;
    getPortfolioData(): {
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
    getProjectCategories(): {
        id: string;
        name: string;
        count: string;
        icon: string;
    }[];
    getCategoryData(categoryId: string): {
        description: any;
        id: string;
        name: string;
        count: string;
        icon: string;
    };
    getProjectsByCategory(category: string): ProjectData[];
    getFeaturedProjects(): ProjectData[];
    getFeaturedProjectsByCategory(category: string): ProjectData[];
    getProjectById(id: string): ProjectData | undefined;
    getAllProjects(): ProjectData[];
}
