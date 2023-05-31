// controllers
import { QueueManagerPaginateJobsController } from './controllers/queue-manager-paginate-jobs.controller';
import { QueueManagerFindJobByIdController } from './controllers/queue-manager-find-job-by-id.controller';
import { QueueManagerDeleteJobByIdController } from './controllers/queue-manager-delete-job-by-id.controller';

// resolvers
import { QueueManagerPaginateJobsResolver } from './resolvers/queue-manager-paginate-jobs.resolver';
import { QueueManagerFindJobByIdResolver } from './resolvers/queue-manager-find-job-by-id.resolver';
import { QueueManagerDeleteJobByIdResolver } from './resolvers/queue-manager-delete-job-by-id.resolver';

// handlers
import { QueueManagerPaginateJobsHandler } from './handlers/queue-manager-paginate-jobs.handler';
import { QueueManagerFindJobByIdHandler } from './handlers/queue-manager-find-job-by-id.handler';
import { QueueManagerDeleteJobByIdHandler } from './handlers/queue-manager-delete-job-by-id.handler';

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