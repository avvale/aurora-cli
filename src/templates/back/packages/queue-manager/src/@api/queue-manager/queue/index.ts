// controllers
import { QueueManagerCreateQueueController } from './controllers/queue-manager-create-queue.controller';
import { QueueManagerCreateQueuesController } from './controllers/queue-manager-create-queues.controller';
import { QueueManagerPaginateQueuesController } from './controllers/queue-manager-paginate-queues.controller';
import { QueueManagerGetQueuesController } from './controllers/queue-manager-get-queues.controller';
import { QueueManagerFindQueueByIdController } from './controllers/queue-manager-find-queue-by-id.controller';
import { QueueManagerFindQueueController } from './controllers/queue-manager-find-queue.controller';
import { QueueManagerUpdateQueueByIdController } from './controllers/queue-manager-update-queue-by-id.controller';
import { QueueManagerUpdateQueuesController } from './controllers/queue-manager-update-queues.controller';
import { QueueManagerUpsertQueueController } from './controllers/queue-manager-upsert-queue.controller';
import { QueueManagerDeleteQueueByIdController } from './controllers/queue-manager-delete-queue-by-id.controller';
import { QueueManagerDeleteQueuesController } from './controllers/queue-manager-delete-queues.controller';

// resolvers
import { QueueManagerCreateQueueResolver } from './resolvers/queue-manager-create-queue.resolver';
import { QueueManagerCreateQueuesResolver } from './resolvers/queue-manager-create-queues.resolver';
import { QueueManagerPaginateQueuesResolver } from './resolvers/queue-manager-paginate-queues.resolver';
import { QueueManagerGetQueuesResolver } from './resolvers/queue-manager-get-queues.resolver';
import { QueueManagerFindQueueByIdResolver } from './resolvers/queue-manager-find-queue-by-id.resolver';
import { QueueManagerFindQueueResolver } from './resolvers/queue-manager-find-queue.resolver';
import { QueueManagerUpdateQueueByIdResolver } from './resolvers/queue-manager-update-queue-by-id.resolver';
import { QueueManagerUpdateQueuesResolver } from './resolvers/queue-manager-update-queues.resolver';
import { QueueManagerUpsertQueueResolver } from './resolvers/queue-manager-upsert-queue.resolver';
import { QueueManagerDeleteQueueByIdResolver } from './resolvers/queue-manager-delete-queue-by-id.resolver';
import { QueueManagerDeleteQueuesResolver } from './resolvers/queue-manager-delete-queues.resolver';

// handlers
import { QueueManagerCreateQueueHandler } from './handlers/queue-manager-create-queue.handler';
import { QueueManagerCreateQueuesHandler } from './handlers/queue-manager-create-queues.handler';
import { QueueManagerPaginateQueuesHandler } from './handlers/queue-manager-paginate-queues.handler';
import { QueueManagerGetQueuesHandler } from './handlers/queue-manager-get-queues.handler';
import { QueueManagerFindQueueByIdHandler } from './handlers/queue-manager-find-queue-by-id.handler';
import { QueueManagerFindQueueHandler } from './handlers/queue-manager-find-queue.handler';
import { QueueManagerUpdateQueueByIdHandler } from './handlers/queue-manager-update-queue-by-id.handler';
import { QueueManagerUpdateQueuesHandler } from './handlers/queue-manager-update-queues.handler';
import { QueueManagerUpsertQueueHandler } from './handlers/queue-manager-upsert-queue.handler';
import { QueueManagerDeleteQueueByIdHandler } from './handlers/queue-manager-delete-queue-by-id.handler';
import { QueueManagerDeleteQueuesHandler } from './handlers/queue-manager-delete-queues.handler';

// seeder
import { QueueManagerQueueSeeder } from './seeder/queue-manager-queue.seeder';

export const QueueManagerQueueControllers = [
    QueueManagerCreateQueueController,
    QueueManagerCreateQueuesController,
    QueueManagerPaginateQueuesController,
    QueueManagerGetQueuesController,
    QueueManagerFindQueueByIdController,
    QueueManagerFindQueueController,
    QueueManagerUpdateQueueByIdController,
    QueueManagerUpdateQueuesController,
    QueueManagerUpsertQueueController,
    QueueManagerDeleteQueueByIdController,
    QueueManagerDeleteQueuesController,
];

export const QueueManagerQueueResolvers = [
    QueueManagerCreateQueueResolver,
    QueueManagerCreateQueuesResolver,
    QueueManagerPaginateQueuesResolver,
    QueueManagerGetQueuesResolver,
    QueueManagerFindQueueByIdResolver,
    QueueManagerFindQueueResolver,
    QueueManagerUpdateQueueByIdResolver,
    QueueManagerUpdateQueuesResolver,
    QueueManagerUpsertQueueResolver,
    QueueManagerDeleteQueueByIdResolver,
    QueueManagerDeleteQueuesResolver,
];

export const QueueManagerQueueApiHandlers = [
    QueueManagerCreateQueueHandler,
    QueueManagerCreateQueuesHandler,
    QueueManagerPaginateQueuesHandler,
    QueueManagerGetQueuesHandler,
    QueueManagerFindQueueByIdHandler,
    QueueManagerFindQueueHandler,
    QueueManagerUpdateQueueByIdHandler,
    QueueManagerUpdateQueuesHandler,
    QueueManagerUpsertQueueHandler,
    QueueManagerDeleteQueueByIdHandler,
    QueueManagerDeleteQueuesHandler,
];

export const QueueManagerQueueServices = [
    QueueManagerQueueSeeder,
];