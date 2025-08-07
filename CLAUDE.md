# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
A minimal developer portfolio website built with static HTML/CSS following Bauhaus design principles inspired by Otl Aicher and Braun design aesthetic.

## Design Requirements (from prd.md)
- **Design Style**: Minimal, Bauhaus, Otl Aicher and Braun inspired
- **Color Palette**: Warm pastels, flat design (no shadows/gradients)
- **Layout**: Header with navigation, footer, main content area
- **Home Page**: Grid layout with placeholder images and project titles
- **Project Pages**: Individual HTML files with title, intro, screenshot, tech stack
- **Navigation**: Back button functionality to return to home

## Project Structure
This is a static website project that should follow this structure:
```
/
├── index.html          # Home page with project grid
├── projects/
│   ├── project1.html   # Individual project pages
│   ├── project2.html
│   └── ...
├── css/
│   └── style.css       # Main stylesheet
├── images/
│   ├── projects/       # Project screenshots
│   └── placeholders/   # Grid placeholder images
└── js/
    └── script.js       # Minimal JS for interactions
```

## Development Approach
- Pure HTML/CSS/JavaScript (no build tools needed)
- Mobile-first responsive design
- Semantic HTML structure
- CSS Grid for project layout
- Minimal dependencies

## Design Implementation Notes
- Use CSS Grid for the project showcase layout
- Implement flat design principles (no box-shadows, gradients, or depth effects)
- Typography should reflect Bauhaus minimalism
- Navigation should be clean and functional
- Maintain consistent spacing and alignment throughout

## Testing
- Test across modern browsers (Chrome, Firefox, Safari, Edge)
- Verify responsive behavior on mobile devices
- Validate HTML and CSS
- Test navigation flow between pages

## Content Structure
Each project page should include:
- Project title
- Brief introduction/description
- Single representative screenshot
- Technology stack used
- Consistent back navigation to home