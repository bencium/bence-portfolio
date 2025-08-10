import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import session = require('express-session');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configure sessions for admin authentication
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
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