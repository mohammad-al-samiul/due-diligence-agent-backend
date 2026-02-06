import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../../domain/entities/project.entity';
import { ProjectStatus } from '../../domain/enums/project-status.enum';
import * as crypto from 'crypto';
import { RequestsService } from '../requests/request.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly repo: Repository<Project>,
    private readonly requestsService: RequestsService,
  ) {}

  // ======================================================
  // Create Project Async
  // ======================================================
  async createProjectAsync(input: {
    name: string;
    questionnaireId: string;
    documentScope?: 'ALL_DOCS' | 'EXPLICIT';
  }): Promise<{ requestId: string; projectId: string }> {
    const request = await this.requestsService.create('CREATE_PROJECT');

    const configHash = crypto
      .createHash('sha256')
      .update(JSON.stringify(input))
      .digest('hex');

    const project = await this.repo.save({
      name: input.name,
      questionnaireId: input.questionnaireId,
      documentScope: input.documentScope ?? 'ALL_DOCS',
      status: ProjectStatus.PROCESSING,
      configHash,
    });

    // async simulation
    setTimeout(() => {
      void this.finishProject(project.id, request.id);
    }, 1500);

    return {
      requestId: request.id,
      projectId: project.id,
    };
  }

  // ======================================================
  // Background handler
  // ======================================================
  private async finishProject(
    projectId: string,
    requestId: string,
  ): Promise<void> {
    try {
      await this.repo.update(projectId, {
        status: ProjectStatus.READY,
      });

      await this.requestsService.updateStatus(requestId, 'COMPLETED');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';

      await this.repo.update(projectId, {
        status: ProjectStatus.FAILED,
      });

      await this.requestsService.updateStatus(requestId, 'FAILED', message);
    }
  }

  // ======================================================
  // STEP 14.1 ⭐ Mark ALL_DOCS Projects Outdated
  // ======================================================
  async markAllDocsProjectsOutdated() {
    return this.repo
      .createQueryBuilder()
      .update(Project)
      .set({ status: ProjectStatus.OUTDATED })
      .where('documentScope = :scope', { scope: 'ALL_DOCS' })
      .andWhere('status = :status', {
        status: ProjectStatus.READY,
      })
      .execute();
  }

  // ======================================================
  // Fetch Project
  // ======================================================
  async getProject(id: string): Promise<Project | null> {
    return this.repo.findOneBy({ id });
  }
}
