# 🚀 Project Overview

A comprehensive overview of development projects in this workspace, organized by category and purpose.

---

## 🔬 AI/ML Research

### BSHR Loop - Information Foraging Research System
**Path**: `Brainstorm Search Hypothesie Refinen loop/`

**Description**: Advanced AI research system that automates human information foraging behavior using iterative brainstorm-search-hypothesize-refine loops. Implements sophisticated information literacy principles to navigate arbitrarily large knowledge domains. Features multi-iteration processing with satisficing-based completion detection and comprehensive note-taking capabilities.

**Tech Stack**: Python, LLMs (GPT-3/4), Jupyter Notebooks, Whisper, Wikipedia API, JSON processing

### Neural Design - Autonomous Design System
**Path**: `neural-design/`

**Description**: Experimental Claude-as-Neural-Network autonomous design system that combines AI reasoning with evolutionary algorithms. Features WebAssembly-based Rust core for high-performance computations and React-based visualization interface. Explores self-modifying design processes and emergent creative behaviors through artificial neural networks.

**Tech Stack**: Next.js 15, TypeScript, React, Rust + WebAssembly, Puppeteer, Framer Motion, Zustand

---

## 🛠️ Developer Tools

### Claude Code Usage Monitor - Real-time Token Tracking
**Path**: `Claude-Code-Usage-Monitor/`

**Description**: Professional CLI tool that provides real-time monitoring of Claude AI token consumption with beautiful terminal visualizations. Features intelligent burn rate calculations, predictive analytics for token depletion, and automatic plan detection with customizable reset schedules. Includes comprehensive session tracking across multiple 5-hour windows.

**Tech Stack**: Python 3.6+, Node.js (ccusage), pytz, terminal UI libraries, JSON processing

### Text Splitter - Token-Aware Text Processing
**Path**: `17d9c8ab644bd2762acf6b19dd0cea39/`

**Description**: Lightweight Python utility for splitting large text documents into manageable chunks based on precise token limits. Uses OpenAI's tiktoken library for accurate tokenization and maintains text coherence while respecting specified boundaries. Ideal for preparing content for LLM processing with strict token constraints.

**Tech Stack**: Python, tiktoken, OpenAI encoding libraries

---

## 🌐 Web Development

### PropWise - AI-Powered Property Intelligence
**Path**: `propwise/`

**Description**: Comprehensive property analysis platform that leverages AI vision technology to generate detailed reports from satellite and street-level imagery. Features multi-view property analysis, bilingual support (English/Hungarian), interactive controls for image manipulation, and editable AI-generated reports. Integrates multiple Google Maps APIs with GPT-4 Vision for professional property assessment.

**Tech Stack**: Next.js 14, TypeScript, TailwindCSS, Shadcn UI, Google Maps APIs, OpenAI GPT-4 Vision, Neon PostgreSQL, Prisma ORM

### GenAI Portfolio - AI-Enhanced Portfolio Site
**Path**: `CascadeProjects/genaiportfolio/`

**Description**: Modern portfolio website template featuring AI-generated visual content showcase with hundreds of Midjourney-created images. Includes automatic image compression pipeline, MDX blog functionality, and comprehensive SEO optimization. Built with modern web technologies for optimal performance and developer experience.

**Tech Stack**: Next.js 14, TypeScript, Tailwind CSS v4, MDX, Sharp (image processing), Vercel Analytics

### Next.js Brand Analyzer - AI Brand Intelligence Tool
**Path**: `CascadeProjects/windsurf-project/`

**Description**: Web application for analyzing brand presence and performance using AI-powered insights. Integrates multiple AI providers (OpenAI, Groq) for comprehensive brand analysis with markdown report generation. Features modern React-based interface with real-time data processing capabilities.

**Tech Stack**: Next.js 14, TypeScript, React, OpenAI API, Groq SDK, Tailwind CSS, Markdown processing

### YelloAI - Hungarian Brand Design Assistant
**Path**: `yelloai/`

**Description**: Specialized conversational RAG system designed for Hungarian brand design consultation. Features multimodal PDF processing with 1,047 entries using page-as-image extraction method, Cohere embeddings for semantic search, and Supabase Edge Functions for real-time responses. Provides expert brand positioning and design guidance in Hungarian language.

**Tech Stack**: React, TypeScript, Supabase, Cohere embeddings v4.0, Edge Functions, vector database

### MedHub-Lab - Medical Application Platform
**Path**: `medhub-lab/`

**Description**: Healthcare application platform featuring PDF processing capabilities and medical document management. Integrates with Supabase for backend services and includes image processing utilities for medical documentation workflows.

**Tech Stack**: Next.js, TypeScript, Supabase, PDF processing, image manipulation libraries

---

## 🎵 Audio & Media Processing

### Live Streaming Starter Kit - Real-time Transcription Platform
**Path**: `live-streaming-starter-kit/`

**Description**: Comprehensive web-based application for real-time audio transcription and translation using Deepgram's Speech-to-Text API. Features English to Hungarian real-time translation via Groq API, WebSocket-based low-latency communication, containerized deployment options, and multiple transcription model support. Includes automatic audio recording and HTTPS-ready production deployment.

**Tech Stack**: Python 3.6+, Deepgram API, Groq API, WebSocket, Docker, Fly.io deployment, PortAudio

---

## ✍️ Content & Publishing

### Bencium Substack - Content Management System
**Path**: `bencium-substack/`

**Description**: Sophisticated Obsidian-based knowledge management system optimized for Substack content creation. Features bi-directional linking, template-based article creation, visual graph navigation for content relationships, and Canvas-based editorial planning. Includes comprehensive workflow for research, drafting, and publication with Substack compatibility.

**Tech Stack**: Obsidian, Markdown, Playwright testing, knowledge graphs, template system

---

## ⚡ Utilities

### JSON Cleaner - Professional Data Sanitization Tool
**Path**: `CascadeProjects/json_cleaner/`

**Description**: Sophisticated Python command-line tool for cleaning JSON data extracted from web scraping operations. Removes SEO artifacts, WordPress metadata, HTML tags, and other web-specific noise while preserving valuable content. Features advanced regex patterns for comprehensive data sanitization and supports batch processing.

**Tech Stack**: Python 3, BeautifulSoup4, argparse, regex, JSON processing, logging

---

## 📊 Project Statistics

| Category | Project Count | Primary Language |
|----------|--------------|------------------|
| AI/ML Research | 2 | Python/TypeScript |
| Developer Tools | 2 | Python |
| Web Development | 5 | TypeScript/JavaScript |
| Audio & Media | 1 | Python |
| Content & Publishing | 1 | Markdown/JavaScript |
| Utilities | 1 | Python |
| **Total Major Projects** | **12** | **Mixed** |
| **Total Directories** | **214** | **Mixed** |

---

## 🏗️ Architecture Patterns

### AI Integration Approaches
- **Conversational RAG**: YelloAI with Cohere embeddings and vector search
- **Vision AI**: PropWise using GPT-4 Vision for image analysis  
- **Autonomous Systems**: Neural Design with evolutionary algorithms
- **Information Foraging**: BSHR Loop with iterative hypothesis refinement

### Data & Backend Strategies
- **Supabase**: YelloAI, MedHub-Lab for backend-as-a-service
- **Neon PostgreSQL**: PropWise for scalable data storage
- **Edge Functions**: YelloAI for serverless AI processing
- **Vector Databases**: Semantic search implementations

### Frontend Technologies
- **Next.js 14/15**: Modern React framework for most web projects
- **TypeScript**: Type safety across all major projects
- **Tailwind CSS**: Utility-first styling approach
- **Shadcn UI**: Component library for consistent design systems

--