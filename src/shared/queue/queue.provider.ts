import { Queue } from 'bullmq';

export const JOB_QUEUE = 'JOB_QUEUE';

export const queueProvider = {
  provide: JOB_QUEUE,
  useFactory: () => {
    return new Queue('jobs', {
      connection: {
        host: 'localhost',
        port: 6379,
      },
    });
  },
};
