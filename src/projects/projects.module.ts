import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { PortfolioService } from '../portfolio/portfolio.service';

@Module({
  controllers: [ProjectsController],
  providers: [PortfolioService],
})
export class ProjectsModule {}