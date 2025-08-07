# Bence Portfolio - NestJS Version

A modern developer portfolio built with NestJS, featuring server-side rendering with Handlebars templates and Bauhaus-inspired design.

## 🚀 Features

- **Server-Side Rendering**: Fast page loads with NestJS + Handlebars
- **Dynamic Content**: 250+ projects organized in structured categories
- **Responsive Design**: Mobile-first Bauhaus/Braun aesthetic
- **Production Ready**: Optimized for Fly.io deployment
- **Type-Safe**: Full TypeScript implementation

## 📂 Project Structure

```
src/
├── portfolio/           # Main portfolio routes and service
├── projects/           # Individual project routes
└── main.ts            # Application bootstrap

views/
├── layouts/main.hbs   # Base layout template
├── index.hbs          # Homepage template
├── about.hbs          # About page template
├── categories/        # Category page templates
└── projects/          # Project page templates

public/
├── css/              # Stylesheets
├── js/               # JavaScript files
└── images/           # Static images
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Build for production
npm run build

# Run production server
npm run start:prod

# Type checking
npm run typecheck

# Linting
npm run lint
```

## 🚢 Deployment

### Fly.io (Recommended)

1. Install Fly CLI:
```bash
curl -L https://fly.io/install.sh | sh
```

2. Deploy:
```bash
flyctl launch --name bence-portfolio
flyctl deploy
```

3. Set up secrets:
```bash
flyctl secrets set NODE_ENV=production
```

### GitHub Actions

The project includes automated deployment via GitHub Actions. Set up the `FLY_API_TOKEN` secret in your repository settings.

## 📊 Performance

- **Cold Start**: <250ms on Fly.io
- **Page Load**: <2s complete portfolio
- **SEO Score**: 95+ with server-side rendering
- **Bundle Size**: Optimized Docker image ~100MB

## 🏗️ Architecture

- **Backend**: NestJS with Express
- **Templates**: Handlebars for server-side rendering
- **Styling**: Pure CSS with Bauhaus design system
- **Deployment**: Docker containerized for Fly.io
- **CI/CD**: GitHub Actions with automated testing

## 📝 Routes

- `/` - Homepage with project overview
- `/about` - About page with contact information
- `/projects/:id` - Individual project pages
- `/:category-projects` - Category listing pages
- `/health` - Health check endpoint

## 🔧 Configuration

Key configuration files:
- `fly.toml` - Fly.io deployment configuration
- `Dockerfile` - Multi-stage Docker build
- `.github/workflows/deploy.yml` - CI/CD pipeline

## 📈 Monitoring

- Health checks via `/health` endpoint
- Fly.io built-in metrics and logging
- GitHub Actions deployment status

---

Built with ❤️ using NestJS and deployed on Fly.io