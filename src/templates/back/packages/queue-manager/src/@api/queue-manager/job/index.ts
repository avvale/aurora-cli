// export DTOs
export { QueueManagerJobDto } from './dto/queue-manager-job.dto';

// export handlers
export { QueueManagerDeleteJobByIdHandler } from './handlers/queue-manager-delete-job-by-id.handler';
export { QueueManagerFindJobByIdHandler } from './handlers/queue-manager-find-job-by-id.handler';
export { QueueManagerPaginateJobsHandler } from './handlers/queue-manager-paginate-jobs.handler';

// controllers
import { QueueManagerDeleteJobByIdController } from './controllers/queue-manager-delete-job-by-id.controller';
import { QueueManagerFindJobByIdController } from './controllers/queue-manager-find-job-by-id.controller';
import { QueueManagerPaginateJobsController } from './controllers/queue-manager-paginate-jobs.controller';

// resolvers
import { QueueManagerDeleteJobByIdResolver } from './resolvers/queue-manager-delete-job-by-id.resolver';
import { QueueManagerFindJobByIdResolver } from './resolvers/queue-manager-find-job-by-id.resolver';
import { QueueManagerPaginateJobsResolver } from './resolvers/queue-manager-paginate-jobs.resolver';

// handlers
import { QueueManagerDeleteJobByIdHandler } from './handlers/queue-manager-delete-job-by-id.handler';
import { QueueManagerFindJobByIdHandler } from './handlers/queue-manager-find-job-by-id.handler';
import { QueueManagerPaginateJobsHandler } from './handlers/queue-manager-paginate-jobs.handler';

// seeder
import { QueueManagerJobSeeder } from './seeder/queue-manager-job.seeder';

// services
import { QueueManagerJobService } from '../shared/services';

export const QueueManagerJobControllers = [
  QueueManagerPaginateJobsController,
  QueueManagerFindJobByIdController,
  QueueManagerDeleteJobByIdController,
];

export const QueueManagerJobResolvers = [
  QueueManagerPaginateJobsResolver,
  QueueManagerFindJobByIdResolver,
  QueueManagerDeleteJobByIdResolver,
];

export const QueueManagerJobApiHandlers = [
  QueueManagerPaginateJobsHandler,
  QueueManagerFindJobByIdHandler,
  QueueManagerDeleteJobByIdHandler,
];

export const QueueManagerJobServices = [
  QueueManagerJobSeeder,
  QueueManagerJobService,
];
