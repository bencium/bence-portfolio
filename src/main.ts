import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import session = require('express-session');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Validate required environment variables
  if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is required');
  }
  if (!process.env.ADMIN_PASSWORD) {
    throw new Error('ADMIN_PASSWORD environment variable is required');
  }

  // Configure sessions for admin authentication
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        httpOnly: true, // Keep httpOnly for security
      },
    }),
  );

  // Configure Handlebars template engine
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // Configure Handlebars to use the main layout
  const hbs = require('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  app.set('view options', { layout: 'layouts/main' });

  // Register Handlebars helpers
  hbs.registerHelper('eq', function(a, b) {
    return a === b;
  });

  hbs.registerHelper('unless', function(condition, options) {
    if (!condition) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  // Set global prefix for API routes (optional)
  // app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Portfolio application is running on port ${port}`);
}

bootstrap();