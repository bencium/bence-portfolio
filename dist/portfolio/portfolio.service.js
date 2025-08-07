"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioService = void 0;
const common_1 = require("@nestjs/common");
let PortfolioService = class PortfolioService {
    constructor() {
        this.portfolioData = {
            name: 'Bence',
            title: 'AI Engineer & Product Designer',
            description: 'Bencium blends brand design, MVP development, and AI-powered strategy into a single fluid sprint, aligning designers, engineers, and intelligent agents inside a rapid-feedback loop that transforms raw insight into polished customer experiences, validated revenue models, and production-grade software in days. Automation handles the busywork of coordination, freeing human talent to focus on creativity and judgment—so every spark moves swiftly from concept to launch with measurable impact.',
            stats: {
                healthcare: 60,
                automation: 45,
                webapp: 35,
                business: 40,
                totalProjects: 250,
            },
        };
        this.projects = [
            {
                id: 'anna-india',
                title: 'Anna India - Psycho-Oncology RAG Chatbot',
                description: 'Sophisticated AI assistant providing psychological support for cancer patients across 22 Indian languages. Built with Next.js, Pinecone vector database, and Sarvam AI integration.',
                category: 'healthcare',
                featured: true,
                technologies: ['Next.js', 'Pinecone', 'Sarvam AI', 'TypeScript', 'RAG'],
            },
            {
                id: 'medhub-ecosystem',
                title: 'MedHub Ecosystem - Medical Platform Suite',
                description: 'Comprehensive medical platform ecosystem including CRM, social networking, AI integration, and environmental health monitoring for healthcare professionals.',
                category: 'healthcare',
                featured: true,
                technologies: ['React', 'Node.js', 'PostgreSQL', 'AI Integration'],
            },
            {
                id: 'burnout-assistant',
                title: 'BurnOut Assistant - Tech Worker Mental Health',
                description: 'Open-source AI-powered therapist specifically designed to address burnout issues among technology professionals and healthcare workers.',
                category: 'healthcare',
                featured: true,
                technologies: ['Python', 'OpenAI', 'Mental Health AI', 'Open Source'],
            },
            {
                id: 'agi-detector',
                title: 'AGI Detector - Emergence Monitoring System',
                description: 'Advanced early-warning system monitoring AI landscape for genuine AGI indicators across 7 major sources. Features multi-source crawling, GPT-4 analysis, and real-time alerts.',
                category: 'research',
                featured: true,
                technologies: ['Python', 'GPT-4', 'Web Scraping', 'Real-time Analytics'],
            },
            {
                id: 'agentic-design',
                title: 'Agentic Design - Autonomous Creative Framework',
                description: 'Framework for creating autonomous image and video prompts without typical AI aesthetics, utilizing LionAGI and SPARC methodology for creative content generation.',
                category: 'research',
                featured: true,
                technologies: ['LionAGI', 'SPARC', 'Creative AI', 'Python'],
            },
            {
                id: 'bds-automation',
                title: 'BDS Automation - Utility Company Workflow',
                description: 'Sophisticated n8n workflow automating Big Difference Scheme processing for Severn Trent Water, including customer validation, discount calculations, and audit logging.',
                category: 'automation',
                featured: true,
                technologies: ['n8n', 'Workflow Automation', 'API Integration'],
            },
            {
                id: 'customer-service-agents',
                title: 'Multi-Agent Customer Service System',
                description: 'Flowise-based intelligent customer service system with specialized agents for refunds, sales, and general queries with seamless handoff capabilities.',
                category: 'automation',
                featured: true,
                technologies: ['Flowise', 'Multi-Agent Systems', 'Customer Service AI'],
            },
            {
                id: 'marketing-automation',
                title: 'Weather-Based Marketing Automation',
                description: 'Intelligent content generation system that monitors weather warnings and automatically creates targeted social media content with water-saving tips and regional alerts.',
                category: 'automation',
                featured: true,
                technologies: ['Weather API', 'Content Generation', 'Social Media Automation'],
            },
            {
                id: 'pwa-news',
                title: 'PWA News Reader - Modern Offline App',
                description: 'Sophisticated Progressive Web App with offline reading, RSS integration, and native app experience. Built with React 19, optimized for <500KB bundle and <3s load time.',
                category: 'webapp',
                featured: true,
                technologies: ['React 19', 'PWA', 'Service Workers', 'Offline-first'],
            },
            {
                id: 'yelloai',
                title: 'YelloAI - AI-Powered Directory Service',
                description: 'Advanced directory and search service with AI-powered recommendations, database-centric architecture, and PLpgSQL business logic implementation.',
                category: 'webapp',
                featured: true,
                technologies: ['PostgreSQL', 'PLpgSQL', 'AI Recommendations', 'Search'],
            },
            {
                id: 'propwise',
                title: 'PropWise - AI Property Intelligence',
                description: 'AI-powered property analysis platform using GPT-4 Vision for satellite and street-level imagery assessment. Generates detailed reports with bilingual support and interactive controls.',
                category: 'business',
                featured: true,
                technologies: ['GPT-4 Vision', 'Property Analysis', 'Bilingual Support'],
            },
            {
                id: 'blinds2go',
                title: 'Blinds2Go - E-commerce Platform Enhancement',
                description: 'Enhanced window blinds e-commerce platform with product customization, AI-powered customer service agents, and advanced search functionality.',
                category: 'business',
                featured: true,
                technologies: ['E-commerce', 'Product Customization', 'AI Customer Service'],
            },
            {
                id: 'transcribe7sec',
                title: 'Transcribe7Sec - Ultra-Fast Audio Processing',
                description: 'High-performance audio transcription service for processing short clips with optimized speed and accuracy for real-time applications.',
                category: 'tools',
                featured: true,
                technologies: ['Audio Processing', 'Real-time', 'High Performance'],
            },
            {
                id: 'dxf-analyzer',
                title: 'DXF Analyzer - CAD File Intelligence',
                description: 'Specialized tool for analyzing DXF files with automated feature extraction, architectural plan analysis, and technical drawing insights.',
                category: 'tools',
                featured: true,
                technologies: ['CAD Analysis', 'DXF Processing', 'Technical Drawings'],
            },
            {
                id: 'curato-ai-news',
                title: 'Curato AI News - Intelligent Aggregation',
                description: 'AI-curated news aggregation platform with personalized recommendations, content quality scoring, and intelligent filtering algorithms.',
                category: 'analytics',
                featured: true,
                technologies: ['News Aggregation', 'AI Curation', 'Content Scoring'],
            },
            {
                id: 'review-analyser',
                title: 'Review Analyser - B2B Intelligence Platform',
                description: 'Sophisticated B2B review analysis platform with swarm-based architecture for distributed processing and advanced sentiment analysis.',
                category: 'analytics',
                featured: true,
                technologies: ['Swarm Architecture', 'Sentiment Analysis', 'B2B Intelligence'],
            },
            {
                id: 'neural-design',
                title: 'Neural Design - AI-Driven Interface System',
                description: 'Neural network inspired design system with dynamic interfaces, adaptive components, and AI-driven layout optimization.',
                category: 'design',
                featured: true,
                technologies: ['Neural Networks', 'Dynamic Interfaces', 'AI Design'],
            },
            {
                id: 'social-content',
                title: 'Social Content Gen - MCP Platform',
                description: 'Advanced content generation platform utilizing Model Context Protocol for multi-AI model integration and sophisticated visual content creation.',
                category: 'design',
                featured: true,
                technologies: ['Model Context Protocol', 'Multi-AI Integration', 'Visual Content'],
            },
        ];
    }
    getPortfolioData() {
        return this.portfolioData;
    }
    getProjectCategories() {
        const categories = [
            { id: 'healthcare', name: 'AI Healthcare & Medical Applications', count: '60+', icon: '🏥' },
            { id: 'research', name: 'AI Research & Detection Tools', count: '25+', icon: '🚀' },
            { id: 'automation', name: 'AI Agents & Automation', count: '45+', icon: '🤖' },
            { id: 'webapp', name: 'Web Applications & PWAs', count: '35+', icon: '🌐' },
            { id: 'business', name: 'Client Work & Business Applications', count: '40+', icon: '💼' },
            { id: 'tools', name: 'Development Tools & Utilities', count: '25+', icon: '🛠️' },
            { id: 'analytics', name: 'Data Processing & Analytics', count: '20+', icon: '📊' },
            { id: 'design', name: 'UI/Design & Animation Projects', count: '15+', icon: '🎨' },
        ];
        return categories;
    }
    getCategoryData(categoryId) {
        const categoryDescriptions = {
            healthcare: 'AI-powered healthcare solutions including RAG chatbots for patient support, medical practice management systems, and specialized applications for oncology, dental care, and mental health. These projects demonstrate real-world applications of AI in regulated healthcare environments with focus on patient safety and compliance.',
            research: 'Advanced AI research tools and early-warning systems, including AGI monitoring, autonomous creative frameworks, and cutting-edge research implementations. These projects explore the frontiers of artificial intelligence and machine learning.',
            automation: 'Complex automation workflows and intelligent agents using n8n, Flowise, and custom frameworks. From utility company automation to marketing content generation and customer service systems, these projects showcase the power of intelligent automation.',
            webapp: 'Modern web applications and Progressive Web Apps featuring offline functionality, real-time features, and optimized performance for production environments. Built with cutting-edge web technologies for optimal user experience.',
            business: 'Production applications for clients across various industries including real estate, e-commerce, professional services, and enterprise software solutions. These projects deliver real business value to organizations.',
            tools: 'Specialized development tools including audio transcription, CAD file analysis, Claude Code integrations, and automated testing frameworks. Tools that enhance developer productivity and streamline workflows.',
            analytics: 'Advanced data processing systems including AI-curated news aggregation, cold email generation, review analysis, and social media analytics. Projects that turn raw data into actionable insights.',
            design: 'Modern interface design systems, animation libraries, AI-powered design tools, and experimental UI patterns pushing the boundaries of user experience. Innovative approaches to visual communication and interaction design.',
        };
        const categories = this.getProjectCategories();
        const category = categories.find(cat => cat.id === categoryId);
        if (category) {
            return {
                ...category,
                description: categoryDescriptions[categoryId] || 'Explore this collection of innovative projects.',
            };
        }
        return null;
    }
    getProjectsByCategory(category) {
        return this.projects.filter(project => project.category === category);
    }
    getFeaturedProjects() {
        return this.projects.filter(project => project.featured);
    }
    getFeaturedProjectsByCategory(category) {
        return this.projects.filter(project => project.category === category && project.featured);
    }
    getProjectById(id) {
        return this.projects.find(project => project.id === id);
    }
    getAllProjects() {
        return this.projects;
    }
};
exports.PortfolioService = PortfolioService;
exports.PortfolioService = PortfolioService = __decorate([
    (0, common_1.Injectable)()
], PortfolioService);
//# sourceMappingURL=portfolio.service.js.map