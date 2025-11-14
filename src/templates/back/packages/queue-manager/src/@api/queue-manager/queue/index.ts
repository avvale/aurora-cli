// export DTOs
export { QueueManagerCreateQueueDto } from './dto/queue-manager-create-queue.dto';
export { QueueManagerQueueDto } from './dto/queue-manager-queue.dto';
export { QueueManagerUpdateQueueByIdDto } from './dto/queue-manager-update-queue-by-id.dto';
export { QueueManagerUpdateQueuesDto } from './dto/queue-manager-update-queues.dto';

// export handlers
export { QueueManagerCreateQueueHandler } from './handlers/queue-manager-create-queue.handler';
export { QueueManagerCreateQueuesHandler } from './handlers/queue-manager-create-queues.handler';
export { QueueManagerDeleteQueueByIdHandler } from './handlers/queue-manager-delete-queue-by-id.handler';
export { QueueManagerDeleteQueuesHandler } from './handlers/queue-manager-delete-queues.handler';
export { QueueManagerFindQueueByIdHandler } from './handlers/queue-manager-find-queue-by-id.handler';
export { QueueManagerFindQueueHandler } from './handlers/queue-manager-find-queue.handler';
export { QueueManagerGetQueuesHandler } from './handlers/queue-manager-get-queues.handler';
export { QueueManagerPaginateQueuesHandler } from './handlers/queue-manager-paginate-queues.handler';
export { QueueManagerUpdateQueueByIdHandler } from './handlers/queue-manager-update-queue-by-id.handler';
export { QueueManagerUpdateQueuesHandler } from './handlers/queue-manager-update-queues.handler';

// export controllers
export { QueueManagerCreateQueueController } from './controllers/queue-manager-create-queue.controller';
export { QueueManagerCreateQueuesController } from './controllers/queue-manager-create-queues.controller';
export { QueueManagerDeleteQueueByIdController } from './controllers/queue-manager-delete-queue-by-id.controller';
export { QueueManagerDeleteQueuesController } from './controllers/queue-manager-delete-queues.controller';
export { QueueManagerFindQueueByIdController } from './controllers/queue-manager-find-queue-by-id.controller';
export { QueueManagerFindQueueController } from './controllers/queue-manager-find-queue.controller';
export { QueueManagerGetQueuesController } from './controllers/queue-manager-get-queues.controller';
export { QueueManagerPaginateQueuesController } from './controllers/queue-manager-paginate-queues.controller';
export { QueueManagerUpdateQueueByIdController } from './controllers/queue-manager-update-queue-by-id.controller';
export { QueueManagerUpdateQueuesController } from './controllers/queue-manager-update-queues.controller';

// export resolvers
export { QueueManagerCreateQueueResolver } from './resolvers/queue-manager-create-queue.resolver';
export { QueueManagerCreateQueuesResolver } from './resolvers/queue-manager-create-queues.resolver';
export { QueueManagerDeleteQueueByIdResolver } from './resolvers/queue-manager-delete-queue-by-id.resolver';
export { QueueManagerDeleteQueuesResolver } from './resolvers/queue-manager-delete-queues.resolver';
export { QueueManagerFindQueueByIdResolver } from './resolvers/queue-manager-find-queue-by-id.resolver';
export { QueueManagerFindQueueResolver } from './resolvers/queue-manager-find-queue.resolver';
export { QueueManagerGetQueuesResolver } from './resolvers/queue-manager-get-queues.resolver';
export { QueueManagerPaginateQueuesResolver } from './resolvers/queue-manager-paginate-queues.resolver';
export { QueueManagerUpdateQueueByIdResolver } from './resolvers/queue-manager-update-queue-by-id.resolver';
export { QueueManagerUpdateQueuesResolver } from './resolvers/queue-manager-update-queues.resolver';

// import controllers
import { QueueManagerCreateQueueController } from './controllers/queue-manager-create-queue.controller';
import { QueueManagerCreateQueuesController } from './controllers/queue-manager-create-queues.controller';
import { QueueManagerDeleteQueueByIdController } from './controllers/queue-manager-delete-queue-by-id.controller';
import { QueueManagerDeleteQueuesController } from './controllers/queue-manager-delete-queues.controller';
import { QueueManagerFindQueueByIdController } from './controllers/queue-manager-find-queue-by-id.controller';
import { QueueManagerFindQueueController } from './controllers/queue-manager-find-queue.controller';
import { QueueManagerGetQueuesController } from './controllers/queue-manager-get-queues.controller';
import { QueueManagerPaginateQueuesController } from './controllers/queue-manager-paginate-queues.controller';
import { QueueManagerUpdateQueueByIdController } from './controllers/queue-manager-update-queue-by-id.controller';
import { QueueManagerUpdateQueuesController } from './controllers/queue-manager-update-queues.controller';

// import resolvers
import { QueueManagerCreateQueueResolver } from './resolvers/queue-manager-create-queue.resolver';
import { QueueManagerCreateQueuesResolver } from './resolvers/queue-manager-create-queues.resolver';
import { QueueManagerDeleteQueueByIdResolver } from './resolvers/queue-manager-delete-queue-by-id.resolver';
import { QueueManagerDeleteQueuesResolver } from './resolvers/queue-manager-delete-queues.resolver';
import { QueueManagerFindQueueByIdResolver } from './resolvers/queue-manager-find-queue-by-id.resolver';
import { QueueManagerFindQueueResolver } from './resolvers/queue-manager-find-queue.resolver';
import { QueueManagerGetQueuesResolver } from './resolvers/queue-manager-get-queues.resolver';
import { QueueManagerPaginateQueuesResolver } from './resolvers/queue-manager-paginate-queues.resolver';
import { QueueManagerUpdateQueueByIdResolver } from './resolvers/queue-manager-update-queue-by-id.resolver';
import { QueueManagerUpdateQueuesResolver } from './resolvers/queue-manager-update-queues.resolver';

// import handlers
import { QueueManagerCreateQueueHandler } from './handlers/queue-manager-create-queue.handler';
import { QueueManagerCreateQueuesHandler } from './handlers/queue-manager-create-queues.handler';
import { QueueManagerDeleteQueueByIdHandler } from './handlers/queue-manager-delete-queue-by-id.handler';
import { QueueManagerDeleteQueuesHandler } from './handlers/queue-manager-delete-queues.handler';
import { QueueManagerFindQueueByIdHandler } from './handlers/queue-manager-find-queue-by-id.handler';
import { QueueManagerFindQueueHandler } from './handlers/queue-manager-find-queue.handler';
import { QueueManagerGetQueuesHandler } from './handlers/queue-manager-get-queues.handler';
import { QueueManagerPaginateQueuesHandler } from './handlers/queue-manager-paginate-queues.handler';
import { QueueManagerUpdateQueueByIdHandler } from './handlers/queue-manager-update-queue-by-id.handler';
import { QueueManagerUpdateQueuesHandler } from './handlers/queue-manager-update-queues.handler';

// import seeder
import { QueueManagerQueueSeeder } from './seeder/queue-manager-queue.seeder';

export const QueueManagerQueueApiControllers = [
    QueueManagerCreateQueueController,
    QueueManagerCreateQueuesController,
    QueueManagerPaginateQueuesController,
    QueueManagerGetQueuesController,
    QueueManagerFindQueueByIdController,
    QueueManagerFindQueueController,
    QueueManagerUpdateQueueByIdController,
    QueueManagerUpdateQueuesController,
    QueueManagerDeleteQueueByIdController,
    QueueManagerDeleteQueuesController,
];

export const QueueManagerQueueApiResolvers = [
    QueueManagerCreateQueueResolver,
    QueueManagerCreateQueuesResolver,
    QueueManagerPaginateQueuesResolver,
    QueueManagerGetQueuesResolver,
    QueueManagerFindQueueByIdResolver,
    QueueManagerFindQueueResolver,
    QueueManagerUpdateQueueByIdResolver,
    QueueManagerUpdateQueuesResolver,
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
    QueueManagerDeleteQueueByIdHandler,
    QueueManagerDeleteQueuesHandler,
];

export const QueueManagerQueueApiServices = [QueueManagerQueueSeeder];
