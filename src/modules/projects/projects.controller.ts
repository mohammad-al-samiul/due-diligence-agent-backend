import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller()
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Post('create-project-async')
  create(@Body() dto: CreateProjectDto) {
    return this.service.createProjectAsync(dto);
  }

  @Get('get-project-info/:id')
  getProject(@Param('id') id: string) {
    return this.service.getProject(id);
  }

  @Get('get-project-status/:id')
  getStatus(@Param('id') id: string) {
    return this.service.getProject(id);
  }
}
