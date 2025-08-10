import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { PortfolioService } from '../portfolio/portfolio.service';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [AdminModule],
  controllers: [ProjectsController],
  providers: [PortfolioService],
})
export class ProjectsModule {}