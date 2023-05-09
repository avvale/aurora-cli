// controllers
import { QueueManagerCreateJobRegistryController } from './controllers/queue-manager-create-job-registry.controller';
import { QueueManagerCreateJobsRegistryController } from './controllers/queue-manager-create-jobs-registry.controller';
import { QueueManagerPaginateJobsRegistryController } from './controllers/queue-manager-paginate-jobs-registry.controller';
import { QueueManagerGetJobsRegistryController } from './controllers/queue-manager-get-jobs-registry.controller';
import { QueueManagerFindJobRegistryByIdController } from './controllers/queue-manager-find-job-registry-by-id.controller';
import { QueueManagerFindJobRegistryController } from './controllers/queue-manager-find-job-registry.controller';
import { QueueManagerUpdateJobRegistryByIdController } from './controllers/queue-manager-update-job-registry-by-id.controller';
import { QueueManagerUpdateJobsRegistryController } from './controllers/queue-manager-update-jobs-registry.controller';
import { QueueManagerUpsertJobRegistryController } from './controllers/queue-manager-upsert-job-registry.controller';
import { QueueManagerDeleteJobRegistryByIdController } from './controllers/queue-manager-delete-job-registry-by-id.controller';
import { QueueManagerDeleteJobsRegistryController } from './controllers/queue-manager-delete-jobs-registry.controller';

// resolvers
import { QueueManagerCreateJobRegistryResolver } from './resolvers/queue-manager-create-job-registry.resolver';
import { QueueManagerCreateJobsRegistryResolver } from './resolvers/queue-manager-create-jobs-registry.resolver';
import { QueueManagerPaginateJobsRegistryResolver } from './resolvers/queue-manager-paginate-jobs-registry.resolver';
import { QueueManagerGetJobsRegistryResolver } from './resolvers/queue-manager-get-jobs-registry.resolver';
import { QueueManagerFindJobRegistryByIdResolver } from './resolvers/queue-manager-find-job-registry-by-id.resolver';
import { QueueManagerFindJobRegistryResolver } from './resolvers/queue-manager-find-job-registry.resolver';
import { QueueManagerUpdateJobRegistryByIdResolver } from './resolvers/queue-manager-update-job-registry-by-id.resolver';
import { QueueManagerUpdateJobsRegistryResolver } from './resolvers/queue-manager-update-jobs-registry.resolver';
import { QueueManagerUpsertJobRegistryResolver } from './resolvers/queue-manager-upsert-job-registry.resolver';
import { QueueManagerDeleteJobRegistryByIdResolver } from './resolvers/queue-manager-delete-job-registry-by-id.resolver';
import { QueueManagerDeleteJobsRegistryResolver } from './resolvers/queue-manager-delete-jobs-registry.resolver';

// handlers
import { QueueManagerCreateJobRegistryHandler } from './handlers/queue-manager-create-job-registry.handler';
import { QueueManagerCreateJobsRegistryHandler } from './handlers/queue-manager-create-jobs-registry.handler';
import { QueueManagerPaginateJobsRegistryHandler } from './handlers/queue-manager-paginate-jobs-registry.handler';
import { QueueManagerGetJobsRegistryHandler } from './handlers/queue-manager-get-jobs-registry.handler';
import { QueueManagerFindJobRegistryByIdHandler } from './handlers/queue-manager-find-job-registry-by-id.handler';
import { QueueManagerFindJobRegistryHandler } from './handlers/queue-manager-find-job-registry.handler';
import { QueueManagerUpdateJobRegistryByIdHandler } from './handlers/queue-manager-update-job-registry-by-id.handler';
import { QueueManagerUpdateJobsRegistryHandler } from './handlers/queue-manager-update-jobs-registry.handler';
import { QueueManagerUpsertJobRegistryHandler } from './handlers/queue-manager-upsert-job-registry.handler';
import { QueueManagerDeleteJobRegistryByIdHandler } from './handlers/queue-manager-delete-job-registry-by-id.handler';
import { QueueManagerDeleteJobsRegistryHandler } from './handlers/queue-manager-delete-jobs-registry.handler';

// seeder
import { QueueManagerJobRegistrySeeder } from './seeder/queue-manager-job-registry.seeder';

export const QueueManagerJobRegistryControllers = [
    QueueManagerCreateJobRegistryController,
    QueueManagerCreateJobsRegistryController,
    QueueManagerPaginateJobsRegistryController,
    QueueManagerGetJobsRegistryController,
    QueueManagerFindJobRegistryByIdController,
    QueueManagerFindJobRegistryController,
    QueueManagerUpdateJobRegistryByIdController,
    QueueManagerUpdateJobsRegistryController,
    QueueManagerUpsertJobRegistryController,
    QueueManagerDeleteJobRegistryByIdController,
    QueueManagerDeleteJobsRegistryController,
];

export const QueueManagerJobRegistryResolvers = [
    QueueManagerCreateJobRegistryResolver,
    QueueManagerCreateJobsRegistryResolver,
    QueueManagerPaginateJobsRegistryResolver,
    QueueManagerGetJobsRegistryResolver,
    QueueManagerFindJobRegistryByIdResolver,
    QueueManagerFindJobRegistryResolver,
    QueueManagerUpdateJobRegistryByIdResolver,
    QueueManagerUpdateJobsRegistryResolver,
    QueueManagerUpsertJobRegistryResolver,
    QueueManagerDeleteJobRegistryByIdResolver,
    QueueManagerDeleteJobsRegistryResolver,
];

export const QueueManagerJobRegistryApiHandlers = [
    QueueManagerCreateJobRegistryHandler,
    QueueManagerCreateJobsRegistryHandler,
    QueueManagerPaginateJobsRegistryHandler,
    QueueManagerGetJobsRegistryHandler,
    QueueManagerFindJobRegistryByIdHandler,
    QueueManagerFindJobRegistryHandler,
    QueueManagerUpdateJobRegistryByIdHandler,
    QueueManagerUpdateJobsRegistryHandler,
    QueueManagerUpsertJobRegistryHandler,
    QueueManagerDeleteJobRegistryByIdHandler,
    QueueManagerDeleteJobsRegistryHandler,
];

export const QueueManagerJobRegistryServices = [
    QueueManagerJobRegistrySeeder,
];