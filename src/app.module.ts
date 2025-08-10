import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ProjectsModule } from './projects/projects.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    PortfolioModule,
    ProjectsModule,
    AdminModule,
    // Serve static files (CSS, JS, images) from public directory - moved after modules
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*', '/admin*', '/'], // Exclude API and admin routes
    }),
  ],
})
export class AppModule {}