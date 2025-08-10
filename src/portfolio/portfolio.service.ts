import { Injectable, OnModuleInit } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  technologies: string[];
  link?: string;
  secondLink?: string;
  heroImage?: string;
  heroImageAlt?: string;
}

export interface ProjectSearchQuery {
  search?: string;
  category?: string;
  tech?: string;
}

export interface CategoryWithCount {
  id: string;
  name: string;
  count: string;
  icon: string;
  projectCount: number;
}

@Injectable()
export class PortfolioService implements OnModuleInit {
  constructor(private readonly adminService: AdminService) {}

  async onModuleInit() {
    // Migrate existing projects to JSON storage on first run
    const existingProjects = await this.adminService.getAllProjects();
    if (existingProjects.length === 0) {
      await this.adminService.migrateFromPortfolioService(this.getHardcodedProjects());
      console.log('Successfully migrated projects to JSON storage');
    }
  }

  private getHardcodedProjects(): ProjectData[] {
    return this.hardcodedProjects;
  }
  private portfolioData = {
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

  private hardcodedProjects: ProjectData[] = [
    // Healthcare Projects
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
    // Research Projects
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
    // Automation Projects
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
    // Web Applications
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
    // Business Projects
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
    // Development Tools
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
    // Analytics Projects
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
    // Design Projects
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
    // Additional Healthcare Projects
    {
      id: 'dr-balsai-suite',
      title: 'Dr. Balsai Medical Applications Suite',
      description: 'Complete medical practice management ecosystem including main application, internal video platform, and Hungarian podcast transcript extraction for medical professional content.',
      category: 'healthcare',
      featured: true,
      technologies: ['Next.js App Router', 'Supabase', 'Python', 'YouTube APIs'],
    },
    {
      id: 'onko24',
      title: 'Oncology Care Management Platform (Onko24)',
      description: 'Advanced oncology care management platform with database optimization for large medical datasets, status monitoring, and specialized PDF processing for medical documents.',
      category: 'healthcare',
      featured: true,
      technologies: ['React', 'Medical Databases', 'PDF Processing', 'Monitoring APIs'],
    },
    {
      id: 'dental-suite',
      title: 'Comprehensive Dental Practice Suite',
      description: 'Complete dental practice management ecosystem including VIPDental management system, PerfectSmile monitoring, and specialized analytics for dental practice optimization.',
      category: 'healthcare',
      featured: true,
      technologies: ['TypeScript', 'React', 'Node.js', 'Analytics'],
    },
    {
      id: 'medhub-crm',
      title: 'MEDHUB-CRM - Medical Customer Relationship Management',
      description: 'Advanced CRM system specifically designed for medical practices with patient management, appointment scheduling, and healthcare workflow optimization.',
      category: 'healthcare',
      featured: false,
      technologies: ['Next.js', 'TypeScript', 'Supabase'],
    },
    {
      id: 'medhub-social',
      title: 'MEDHUB-SOCIAL - Medical Professional Social Platform',
      description: 'Social networking platform designed for healthcare professionals to collaborate, share knowledge, and connect within the medical community.',
      category: 'healthcare',
      featured: false,
      technologies: ['React', 'TailwindCSS', 'PostgreSQL'],
    },
    {
      id: 'elitemed',
      title: 'EliteMed - Elite Medical Services Platform',
      description: 'Premium medical services platform designed for high-end healthcare delivery with advanced medical API integrations.',
      category: 'healthcare',
      featured: false,
      technologies: ['Next.js', 'Medical APIs', 'Premium Services'],
    },
    // MedHub Ecosystem Projects
    {
      id: 'medhub-eco',
      title: 'MEDHUB-ECO - Environmental Health Platform',
      description: 'Ecological and environmental health monitoring platform focusing on environmental factors affecting public health and medical outcomes.',
      category: 'healthcare',
      featured: false,
      technologies: ['React', 'Environmental APIs', 'Health Analytics'],
    },
    {
      id: 'medhub-cohere',
      title: 'MEDHUB-cohere - AI Integration with Cohere Models',
      description: 'AI-powered medical platform integration using Cohere language models for advanced natural language processing in healthcare contexts.',
      category: 'healthcare',
      featured: false,
      technologies: ['Node.js', 'Cohere API', 'PostgreSQL'],
    },
    {
      id: 'medhub-cohere-shadcn',
      title: 'MEDHUB-cohere-shadcn - Enhanced UI with Shadcn Components',
      description: 'Enhanced version of the MedHub Cohere integration featuring modern UI components and improved user experience design.',
      category: 'healthcare',
      featured: false,
      technologies: ['React', 'Shadcn UI', 'Cohere API'],
    },
    {
      id: 'medhub-convos-patient-detection',
      title: 'medhub-convos-patient-detection - Patient Conversation Monitoring',
      description: 'Advanced AI system for monitoring and analyzing patient conversations to detect health concerns and provide clinical insights.',
      category: 'healthcare',
      featured: false,
      technologies: ['AI/ML', 'NLP', 'Patient Analytics'],
    },
    {
      id: 'medhub-site',
      title: 'medhub-site - Main MedHub Website',
      description: 'Primary website and landing pages for the MedHub ecosystem, showcasing medical services and platform capabilities.',
      category: 'healthcare',
      featured: false,
      technologies: ['Next.js', 'Static Site Generation', 'Medical Content'],
    },
    {
      id: 'medhub3',
      title: 'medhub3 - Third Generation Platform',
      description: 'Latest iteration of the core MedHub platform with modern React architecture and enhanced medical workflow capabilities.',
      category: 'healthcare',
      featured: false,
      technologies: ['Modern React', 'TypeScript', 'Advanced Architecture'],
    },
    // Medical Practice Monitoring Suite
    {
      id: 'onko-monitor',
      title: 'onko-monitor - Oncology Practice Monitoring System',
      description: 'Comprehensive monitoring system for oncology practices featuring Anna chat history integration and patient interaction tracking for cancer care workflows.',
      category: 'healthcare',
      featured: false,
      technologies: ['JavaScript', 'Node.js', 'Chat Integration'],
    },
    {
      id: 'perfectsmile-monitor',
      title: 'perfectsmile-monitor - Dental Practice Monitoring Solution',
      description: 'Comprehensive monitoring solution for dental practices tracking patient engagement, appointment efficiency, and practice performance optimization.',
      category: 'healthcare',
      featured: false,
      technologies: ['JavaScript', 'Node.js', 'Dental Analytics'],
    },
    {
      id: 'vipdental-monitor',
      title: 'vipdental-monitor - VIP Dental Practice Analytics',
      description: 'Advanced analytics and monitoring system for VIP dental practices providing insights into patient care quality and revenue optimization.',
      category: 'healthcare',
      featured: false,
      technologies: ['JavaScript', 'Node.js', 'Advanced Analytics'],
    },
    {
      id: 'btc-monitor',
      title: 'btc-monitor - Budai T Centrum Monitoring System',
      description: 'Specialized monitoring system for Budai T Centrum providing real-time tracking and analytics for medical center operations.',
      category: 'healthcare',
      featured: false,
      technologies: ['JavaScript', 'Node.js', 'Medical Center Analytics'],
    },
    {
      id: 'sikos-monitor',
      title: 'sikos-monitor - Sikos Medical Practice Monitoring',
      description: 'Specialized monitoring system for Sikos medical practice focusing on patient flow analytics and clinical workflow optimization.',
      category: 'healthcare',
      featured: false,
      technologies: ['JavaScript', 'Node.js', 'Workflow Analytics'],
    },
    {
      id: 'convo-monitor-perfectsmile',
      title: 'convo-monitor-perfectsmile-monitor - Specialized Dental Conversation Monitoring',
      description: 'Advanced conversation monitoring system specifically designed for dental practice customer service and patient communication analysis.',
      category: 'healthcare',
      featured: false,
      technologies: ['AI Monitoring', 'Dental Services', 'Customer Service Analytics'],
    },
    // Oncology & Database Management Projects
    {
      id: 'onko24-anthropicstatus',
      title: 'onko24-anthropicstatus - Oncology Service Status Monitoring',
      description: 'Real-time status monitoring system for oncology services ensuring continuous availability and performance tracking.',
      category: 'healthcare',
      featured: false,
      technologies: ['Monitoring APIs', 'Status Tracking', 'Service Health'],
    },
    {
      id: 'onkodb',
      title: 'onkodb - Oncology Database Management System',
      description: 'Advanced database management system optimized for oncology data with large dataset handling and medical record optimization.',
      category: 'healthcare',
      featured: false,
      technologies: ['Database Optimization', 'Large Datasets', 'Medical Records'],
    },
    {
      id: 'onkodb-processed',
      title: 'onkodb-processed - Processed Oncology Data Management',
      description: 'Specialized system for managing processed oncology data with advanced data processing pipelines and analytics capabilities.',
      category: 'healthcare',
      featured: false,
      technologies: ['Data Processing', 'Analytics Pipelines', 'Medical Data'],
    },
    {
      id: 'onkodb-problematic-large-pdfs',
      title: 'onkodb-problematic-large-pdfs - Large Medical PDF Processing',
      description: 'Specialized tool for processing large and complex PDF documents in medical environments with advanced file handling capabilities.',
      category: 'healthcare',
      featured: false,
      technologies: ['PDF Processing', 'File Handling', 'Medical Documents'],
    },
    // Specialized Medical Applications
    {
      id: 'preciz',
      title: 'preciz - Medical Precision Diagnostic Tool',
      description: 'Advanced precision diagnostic tool with medical device integrations for accurate diagnosis and treatment planning.',
      category: 'healthcare',
      featured: false,
      technologies: ['TypeScript', 'Medical Device Integration', 'Diagnostic Tools'],
    },
    {
      id: 'vipdental',
      title: 'vipdental - Dental Practice Management System',
      description: 'Comprehensive dental practice management application with patient management, appointment scheduling, and dental workflow optimization.',
      category: 'healthcare',
      featured: false,
      technologies: ['TypeScript', 'React', 'Next.js'],
    },
    {
      id: 'open-health',
      title: 'open-health - Open Source Health Platform',
      description: 'Open source health platform with public APIs and community-driven healthcare tools for broader medical community access.',
      category: 'healthcare',
      featured: false,
      technologies: ['React', 'Open APIs', 'Community Driven'],
    },
    {
      id: 'hodinka-reumatologia',
      title: 'Hodinka-Reumatologia - Rheumatology Practice Website',
      description: 'Specialized website for rheumatology practice with patient portal and medical service information.',
      category: 'healthcare',
      featured: false,
      technologies: ['Medical Website', 'Patient Portal', 'Rheumatology Focus'],
    },
    {
      id: 'medhubaai-newsletter',
      title: 'MedHubAI-NEWSLETTER - Medical AI Newsletter Platform',
      description: 'Automated newsletter platform focusing on medical AI developments with content management and email automation capabilities.',
      category: 'healthcare',
      featured: false,
      technologies: ['Content Management', 'Email Automation', 'Medical AI Content'],
    },
    {
      id: 'aurelia-egeszseg',
      title: 'Aurelia-Egeszseg - Hungarian Health Platform',
      description: 'Health platform specifically designed for Hungarian market with local healthcare services and medical information.',
      category: 'healthcare',
      featured: false,
      technologies: ['Medical Services', 'Local Healthcare', 'Hungarian Language'],
    },
    {
      id: 'chronic-health-ai',
      title: 'Chronic_Health_AI - AI-Assisted Chronic Illness Management',
      description: 'Comprehensive platform using AI chatbots like Claude and ChatGPT to help track, diagnose, and support recovery from chronic illnesses.',
      category: 'healthcare',
      featured: false,
      technologies: ['AI Integration', 'Health Analytics', 'Chronic Care'],
    },
    // Additional Research Projects
    {
      id: 'morphic',
      title: 'Morphic - AI-Powered Search Engine',
      description: 'AI-powered search engine with generative UI, intelligent query processing, and advanced result synthesis. Features real-time information gathering and contextual response generation.',
      category: 'research',
      featured: true,
      technologies: ['Generative UI', 'AI Search', 'Real-time Processing', 'Claude Code'],
    },
    {
      id: 'sparc-evolution',
      title: 'SPARC Evolution - Advanced Problem-Solving Framework',
      description: 'Evolution of the SPARC framework for structured problem-solving with enhanced AI integration, automated analysis, and iterative refinement capabilities.',
      category: 'research',
      featured: true,
      technologies: ['SPARC Framework', 'Problem Solving', 'AI Integration', 'Iterative Analysis'],
    },
    {
      id: 'tersa',
      title: 'Tersa - Open Source AI Workflow Canvas',
      description: 'Open source AI workflow canvas for visual programming and automation, enabling drag-and-drop AI pipeline creation with community contributions.',
      category: 'research',
      featured: true,
      technologies: ['Open Source', 'Visual Programming', 'AI Workflows', 'Community Driven'],
    },
    {
      id: 'open-notebooklm',
      title: 'Open NotebookLM - PDF to Podcast Conversion',
      description: 'Open source tool for converting PDF documents to podcast-style audio content using advanced AI narration and content structuring.',
      category: 'research',
      featured: true,
      technologies: ['PDF Processing', 'Audio Generation', 'AI Narration', 'Open Source'],
    },
    // Additional Automation Projects
    {
      id: 'swarm-coordination',
      title: 'AI Agent Swarm Coordination Platform',
      description: 'Advanced multi-agent coordination platform enabling swarm-based architecture for distributed AI processing, intelligent task allocation, and coordinated agent collaboration.',
      category: 'automation',
      featured: true,
      technologies: ['Multi-agent Systems', 'Coordination', 'Distributed Processing', 'Intelligent Allocation'],
    },
    {
      id: 'voice-deepgram',
      title: 'Voice-Enabled AI Agent with Deepgram',
      description: 'Sophisticated voice-enabled AI agent utilizing Deepgram SDK for real-time speech processing, WebSocket communication, and natural language interaction capabilities.',
      category: 'automation',
      featured: true,
      technologies: ['Node.js', 'TypeScript', 'Deepgram SDK', 'WebSockets', 'Voice Processing'],
    },
    {
      id: 'b2b-review-swarm',
      title: 'B2B Review Analysis Platform with Swarm Architecture',
      description: 'Sophisticated B2B review analysis platform utilizing swarm-based architecture for distributed processing of customer reviews and feedback with Claude Code integration.',
      category: 'automation',
      featured: true,
      technologies: ['TypeScript', 'Claude Code', 'Swarm Architecture', 'Review Analysis'],
    },
    {
      id: 'n8n-water-scraping',
      title: 'N8N Water Utility Data Scraping Automation',
      description: 'Advanced n8n automation workflow for scraping water utility data from Severn Trent Water and Portsmouth Water, with dedicated landing page for data service marketing.',
      category: 'automation',
      featured: true,
      technologies: ['n8n Automation', 'Utility Data', 'Web Scraping', 'Data Processing'],
    },
    {
      id: 'automation-detector',
      title: 'Automation Detector - Bot Detection System',
      description: 'Advanced bot and automation detection system with security features, browser fingerprinting, and sophisticated algorithms to identify automated behavior patterns.',
      category: 'automation',
      featured: true,
      technologies: ['Security', 'Browser Fingerprinting', 'Bot Detection', 'Pattern Analysis'],
    },
    {
      id: 'gemini-live',
      title: 'Gemini Live - Real-time AI Interactions',
      description: 'Live Google Gemini AI integration platform with React and WebRTC for real-time AI interactions, conversational interfaces, and dynamic response generation.',
      category: 'automation',
      featured: true,
      technologies: ['React', 'Google Gemini API', 'WebRTC', 'Real-time Processing'],
    },
    // Additional Web Application Projects
    {
      id: 'astro-blog-template',
      title: 'Modern Astro Blog Template',
      description: 'Modern, performant blog template built with Astro featuring static site generation, optimized performance, and modern design patterns for content-focused websites.',
      category: 'webapp',
      featured: true,
      technologies: ['Astro', 'Static Site Generation', 'Performance Optimization', 'Modern Design'],
    },
    {
      id: 'figma-workflow',
      title: 'Figma to Website Workflow Demonstration',
      description: 'Complete workflow demonstration showing the conversion from Figma designs to production websites with automated asset extraction and code generation.',
      category: 'webapp',
      featured: true,
      technologies: ['Figma API', 'Workflow Automation', 'Asset Extraction', 'Code Generation'],
    },
    // Additional Business Projects
    {
      id: 'nective',
      title: 'Nective - Client Platform Suite',
      description: 'Comprehensive client platform suite featuring project management, collaboration tools, and integrated business workflows for professional service organizations.',
      category: 'business',
      featured: true,
      technologies: ['Next.js', 'Project Management', 'Collaboration', 'Business Workflows'],
    },
    {
      id: 'paris-noble',
      title: 'Paris Noble - Professional Portfolio Platform',
      description: 'Elegant professional portfolio platform with sophisticated branding, responsive design, and content management capabilities for creative professionals.',
      category: 'business',
      featured: true,
      technologies: ['Portfolio Design', 'Professional Branding', 'Content Management', 'Responsive Design'],
    },
    // Additional Development Tools
    {
      id: 'claude-code-extensions',
      title: 'Claude Code Integrations & Extensions',
      description: 'Collection of integrations and extensions for Claude Code including workflow automation, template generation, and development productivity enhancements.',
      category: 'tools',
      featured: true,
      technologies: ['Claude Code', 'Workflow Automation', 'Template Generation', 'Development Tools'],
    },
    {
      id: 'audio-transcription-suite',
      title: 'Audio Transcription & Processing Suite',
      description: 'Comprehensive suite of audio transcription tools with multiple AI provider integrations, real-time processing, and advanced audio analysis capabilities.',
      category: 'tools',
      featured: true,
      technologies: ['Audio Processing', 'Multiple AI Providers', 'Real-time Transcription', 'Audio Analysis'],
    },
    // Additional Analytics Projects
    {
      id: 'cold-email-gemini',
      title: 'Cold Email Generation with Gemini AI',
      description: 'Advanced cold email generation system using Google Gemini AI for personalized outreach, A/B testing, and performance analytics with high conversion optimization.',
      category: 'analytics',
      featured: true,
      technologies: ['Google Gemini AI', 'Email Automation', 'A/B Testing', 'Performance Analytics'],
    },
    {
      id: 'growth-analytics',
      title: 'Growth Analytics & Social Intelligence',
      description: 'Comprehensive growth analytics platform with social media intelligence, user behavior analysis, and predictive growth modeling for business optimization.',
      category: 'analytics',
      featured: true,
      technologies: ['Growth Analytics', 'Social Intelligence', 'Predictive Modeling', 'Business Optimization'],
    },
    // Additional Design Projects
    {
      id: 'agentic-ux-patterns',
      title: 'Agentic Design - AI Agent UX Patterns',
      description: 'Comprehensive UX pattern library specifically designed for AI agent interfaces, featuring conversational UI patterns, progressive disclosure, and trust-building design elements.',
      category: 'design',
      featured: true,
      technologies: ['UX Patterns', 'AI Interfaces', 'Conversational UI', 'Trust Design'],
    },
    {
      id: 'animation-libraries',
      title: 'Animation Libraries & Motion Design',
      description: 'Collection of modern animation libraries and motion design systems with React integration, micro-interactions, and performance-optimized animations.',
      category: 'design',
      featured: true,
      technologies: ['Animation Libraries', 'Motion Design', 'React Animation', 'Micro-interactions'],
    },
  ];

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

  getCategoryData(categoryId: string) {
    const categoryDescriptions = {
      healthcare: 'A comprehensive ecosystem of AI-powered healthcare solutions spanning psycho-oncology support, medical practice management, patient monitoring, and specialized diagnostic tools. Built with modern frameworks and designed for regulated healthcare environments with HIPAA compliance considerations.',
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

  async getProjectsByCategory(category: string): Promise<ProjectData[]> {
    return this.adminService.getProjectsByCategory(category);
  }

  async getFeaturedProjects(): Promise<ProjectData[]> {
    return this.adminService.getFeaturedProjects();
  }

  async getFeaturedProjectsByCategory(category: string): Promise<ProjectData[]> {
    const projects = await this.adminService.getProjectsByCategory(category);
    return projects.filter(project => project.featured);
  }

  async getProjectById(id: string): Promise<ProjectData | undefined> {
    try {
      return await this.adminService.getProjectById(id);
    } catch (error) {
      return undefined;
    }
  }

  async getAllProjects(): Promise<ProjectData[]> {
    return this.adminService.getAllProjects();
  }

  // Search and filter methods
  async searchProjects(query: ProjectSearchQuery): Promise<ProjectData[]> {
    let filteredProjects = await this.adminService.getAllProjects();

    // Filter by text search (title and description)
    if (query.search) {
      const searchTerm = query.search.toLowerCase();
      filteredProjects = filteredProjects.filter(project =>
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by category
    if (query.category) {
      filteredProjects = filteredProjects.filter(project =>
        project.category === query.category
      );
    }

    // Filter by technology
    if (query.tech) {
      const techTerm = query.tech.toLowerCase();
      filteredProjects = filteredProjects.filter(project =>
        project.technologies.some(tech =>
          tech.toLowerCase().includes(techTerm)
        )
      );
    }

    return filteredProjects;
  }

  // Get related projects (same category, excluding current project)
  async getRelatedProjects(projectId: string, limit: number = 4): Promise<ProjectData[]> {
    const allProjects = await this.adminService.getAllProjects();
    const currentProject = allProjects.find(p => p.id === projectId);
    
    if (!currentProject) {
      return [];
    }

    return allProjects
      .filter(project => 
        project.id !== projectId && 
        project.category === currentProject.category
      )
      .slice(0, limit);
  }

  async getAllTechnologies(): Promise<string[]> {
    const allTechs = new Set<string>();
    const projects = await this.adminService.getAllProjects();
    projects.forEach(project => {
      project.technologies.forEach(tech => allTechs.add(tech));
    });
    return Array.from(allTechs).sort();
  }

  async getCategoriesWithCounts(): Promise<CategoryWithCount[]> {
    const categories = this.getProjectCategories();
    const projects = await this.adminService.getAllProjects();
    return categories.map(category => ({
      ...category,
      projectCount: projects.filter(p => p.category === category.id).length
    }));
  }
}