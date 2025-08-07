import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    // Serve static files (CSS, JS, images) from public directory
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/(.*)'],
    }),
    PortfolioModule,
    ProjectsModule,
  ],
})
export class AppModule {}