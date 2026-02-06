import { Worker, Job } from 'bullmq';
import { JobPayloadMap } from './queue.type';

type JobName = keyof JobPayloadMap;

new Worker(
  'jobs',

  async (job: Job<JobPayloadMap[JobName], void, JobName>): Promise<void> => {
    switch (job.name) {
      case 'INDEX_DOCUMENT': {
        const data = job.data as JobPayloadMap['INDEX_DOCUMENT'];
        console.log('Index:', data.documentId);
        break;
      }

      case 'CREATE_PROJECT': {
        const data = job.data as JobPayloadMap['CREATE_PROJECT'];
        console.log('Project:', data.projectId);
        break;
      }

      case 'GENERATE_ANSWER': {
        const data = job.data as JobPayloadMap['GENERATE_ANSWER'];
        console.log('Answer:', data.answerId);
        break;
      }
    }

    // ✅ tiny await to satisfy eslint + bullmq
    await Promise.resolve();
  },

  { connection: { host: 'localhost', port: 6379 } },
);
