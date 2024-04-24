// export commands
export { QueueManagerCreateQueueCommand } from './application/create/queue-manager-create-queue.command';
export { QueueManagerCreateQueuesCommand } from './application/create/queue-manager-create-queues.command';
export { QueueManagerUpdateQueueByIdCommand } from './application/update/queue-manager-update-queue-by-id.command';
export { QueueManagerUpdateQueuesCommand } from './application/update/queue-manager-update-queues.command';
export { QueueManagerUpdateAndIncrementQueuesCommand } from './application/update/queue-manager-update-and-increment-queues.command';
export { QueueManagerUpsertQueueCommand } from './application/upsert/queue-manager-upsert-queue.command';
export { QueueManagerDeleteQueueByIdCommand } from './application/delete/queue-manager-delete-queue-by-id.command';
export { QueueManagerDeleteQueuesCommand } from './application/delete/queue-manager-delete-queues.command';

// export queries
export { QueueManagerPaginateQueuesQuery } from './application/paginate/queue-manager-paginate-queues.query';
export { QueueManagerGetQueuesQuery } from './application/get/queue-manager-get-queues.query';
export { QueueManagerFindQueueQuery } from './application/find/queue-manager-find-queue.query';
export { QueueManagerFindQueueByIdQuery } from './application/find/queue-manager-find-queue-by-id.query';
export { QueueManagerRawSQLQueuesQuery } from './application/raw-sql/queue-manager-raw-sql-queues.query';
export { QueueManagerCountQueueQuery } from './application/count/queue-manager-count-queue.query';
export { QueueManagerMaxQueueQuery } from './application/max/queue-manager-max-queue.query';
export { QueueManagerMinQueueQuery } from './application/min/queue-manager-min-queue.query';
export { QueueManagerSumQueueQuery } from './application/sum/queue-manager-sum-queue.query';

// export mocks
export { queueManagerMockQueueData } from './infrastructure/mock/queue-manager-mock-queue.data';
export { QueueManagerMockQueueSeeder } from './infrastructure/mock/queue-manager-mock-queue.seeder';
export { QueueManagerMockQueueRepository } from './infrastructure/mock/queue-manager-mock-queue.repository';

// export events
export { QueueManagerAddQueuesContextEvent } from './application/events/queue-manager-add-queues-context.event';
export { QueueManagerCreatedQueuesEvent } from './application/events/queue-manager-created-queues.event';
export { QueueManagerCreatedQueueEvent } from './application/events/queue-manager-created-queue.event';
export { QueueManagerDeletedQueuesEvent } from './application/events/queue-manager-deleted-queues.event';
export { QueueManagerDeletedQueueEvent } from './application/events/queue-manager-deleted-queue.event';
export { QueueManagerUpdatedQueuesEvent } from './application/events/queue-manager-updated-queues.event';
export { QueueManagerUpdatedQueueEvent } from './application/events/queue-manager-updated-queue.event';
export { QueueManagerUpdatedAndIncrementedQueuesEvent } from './application/events/queue-manager-updated-and-incremented-queues.event';
export { QueueManagerUpdatedAndIncrementedQueueEvent } from './application/events/queue-manager-updated-and-incremented-queue.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { QueueManagerQueue } from './domain/queue-manager-queue.aggregate';
export { QueueManagerQueueMapper } from './domain/queue-manager-queue.mapper';
export { QueueManagerIQueueRepository } from './domain/queue-manager-queue.repository';
export { QueueManagerQueueResponse } from './domain/queue-manager-queue.response';

// infrastructure
export { QueueManagerQueueModel } from './infrastructure/sequelize/queue-manager-sequelize-queue.model';
export { QueueManagerSequelizeQueueRepository } from './infrastructure/sequelize/queue-manager-sequelize-queue.repository';

// sagas
export { QueueManagerQueueSagas } from './application/sagas/queue-manager-queue.sagas';

// command handlers
import { QueueManagerCreateQueueCommandHandler } from './application/create/queue-manager-create-queue.command-handler';
import { QueueManagerCreateQueuesCommandHandler } from './application/create/queue-manager-create-queues.command-handler';
import { QueueManagerUpdateQueueByIdCommandHandler } from './application/update/queue-manager-update-queue-by-id.command-handler';
import { QueueManagerUpdateQueuesCommandHandler } from './application/update/queue-manager-update-queues.command-handler';
import { QueueManagerUpdateAndIncrementQueuesCommandHandler } from './application/update/queue-manager-update-and-increment-queues.command-handler';
import { QueueManagerUpsertQueueCommandHandler } from './application/upsert/queue-manager-upsert-queue.command-handler';
import { QueueManagerDeleteQueueByIdCommandHandler } from './application/delete/queue-manager-delete-queue-by-id.command-handler';
import { QueueManagerDeleteQueuesCommandHandler } from './application/delete/queue-manager-delete-queues.command-handler';

// query handlers
import { QueueManagerPaginateQueuesQueryHandler } from './application/paginate/queue-manager-paginate-queues.query-handler';
import { QueueManagerGetQueuesQueryHandler } from './application/get/queue-manager-get-queues.query-handler';
import { QueueManagerFindQueueQueryHandler } from './application/find/queue-manager-find-queue.query-handler';
import { QueueManagerFindQueueByIdQueryHandler } from './application/find/queue-manager-find-queue-by-id.query-handler';
import { QueueManagerRawSQLQueuesQueryHandler } from './application/raw-sql/queue-manager-raw-sql-queues.query-handler';
import { QueueManagerCountQueueQueryHandler } from './application/count/queue-manager-count-queue.query-handler';
import { QueueManagerMaxQueueQueryHandler } from './application/max/queue-manager-max-queue.query-handler';
import { QueueManagerMinQueueQueryHandler } from './application/min/queue-manager-min-queue.query-handler';
import { QueueManagerSumQueueQueryHandler } from './application/sum/queue-manager-sum-queue.query-handler';

// event handlers
import { QueueManagerCreatedQueueEventHandler } from './application/events/queue-manager-created-queue.event-handler';
import { QueueManagerCreatedQueuesEventHandler } from './application/events/queue-manager-created-queues.event-handler';
import { QueueManagerUpdatedQueueEventHandler } from './application/events/queue-manager-updated-queue.event-handler';
import { QueueManagerUpdatedQueuesEventHandler } from './application/events/queue-manager-updated-queues.event-handler';
import { QueueManagerUpdatedAndIncrementedQueuesEventHandler } from './application/events/queue-manager-updated-and-incremented-queues.event-handler';
import { QueueManagerDeletedQueueEventHandler } from './application/events/queue-manager-deleted-queue.event-handler';
import { QueueManagerDeletedQueuesEventHandler } from './application/events/queue-manager-deleted-queues.event-handler';

// services
import { QueueManagerCreateQueueService } from './application/create/queue-manager-create-queue.service';
import { QueueManagerCreateQueuesService } from './application/create/queue-manager-create-queues.service';
import { QueueManagerPaginateQueuesService } from './application/paginate/queue-manager-paginate-queues.service';
import { QueueManagerGetQueuesService } from './application/get/queue-manager-get-queues.service';
import { QueueManagerFindQueueService } from './application/find/queue-manager-find-queue.service';
import { QueueManagerFindQueueByIdService } from './application/find/queue-manager-find-queue-by-id.service';
import { QueueManagerRawSQLQueuesService } from './application/raw-sql/queue-manager-raw-sql-queues.service';
import { QueueManagerCountQueueService } from './application/count/queue-manager-count-queue.service';
import { QueueManagerMaxQueueService } from './application/max/queue-manager-max-queue.service';
import { QueueManagerMinQueueService } from './application/min/queue-manager-min-queue.service';
import { QueueManagerSumQueueService } from './application/sum/queue-manager-sum-queue.service';
import { QueueManagerUpdateQueueByIdService } from './application/update/queue-manager-update-queue-by-id.service';
import { QueueManagerUpdateQueuesService } from './application/update/queue-manager-update-queues.service';
import { QueueManagerUpdateAndIncrementQueuesService } from './application/update/queue-manager-update-and-increment-queues.service';
import { QueueManagerUpsertQueueService } from './application/upsert/queue-manager-upsert-queue.service';
import { QueueManagerDeleteQueueByIdService } from './application/delete/queue-manager-delete-queue-by-id.service';
import { QueueManagerDeleteQueuesService } from './application/delete/queue-manager-delete-queues.service';

export const QueueManagerQueueHandlers = [
    // commands
    QueueManagerCreateQueueCommandHandler,
    QueueManagerCreateQueuesCommandHandler,
    QueueManagerUpdateQueueByIdCommandHandler,
    QueueManagerUpdateQueuesCommandHandler,
    QueueManagerUpdateAndIncrementQueuesCommandHandler,
    QueueManagerUpsertQueueCommandHandler,
    QueueManagerDeleteQueueByIdCommandHandler,
    QueueManagerDeleteQueuesCommandHandler,

    // queries
    QueueManagerPaginateQueuesQueryHandler,
    QueueManagerGetQueuesQueryHandler,
    QueueManagerFindQueueQueryHandler,
    QueueManagerFindQueueByIdQueryHandler,
    QueueManagerRawSQLQueuesQueryHandler,
    QueueManagerCountQueueQueryHandler,
    QueueManagerMaxQueueQueryHandler,
    QueueManagerMinQueueQueryHandler,
    QueueManagerSumQueueQueryHandler,

    // events
    QueueManagerCreatedQueueEventHandler,
    QueueManagerCreatedQueuesEventHandler,
    QueueManagerUpdatedQueueEventHandler,
    QueueManagerUpdatedQueuesEventHandler,
    QueueManagerUpdatedAndIncrementedQueuesEventHandler,
    QueueManagerDeletedQueueEventHandler,
    QueueManagerDeletedQueuesEventHandler,
];

export const QueueManagerQueueServices = [
    QueueManagerCreateQueueService,
    QueueManagerCreateQueuesService,
    QueueManagerPaginateQueuesService,
    QueueManagerGetQueuesService,
    QueueManagerFindQueueService,
    QueueManagerFindQueueByIdService,
    QueueManagerRawSQLQueuesService,
    QueueManagerCountQueueService,
    QueueManagerMaxQueueService,
    QueueManagerMinQueueService,
    QueueManagerSumQueueService,
    QueueManagerUpdateQueueByIdService,
    QueueManagerUpdateQueuesService,
    QueueManagerUpdateAndIncrementQueuesService,
    QueueManagerUpsertQueueService,
    QueueManagerDeleteQueueByIdService,
    QueueManagerDeleteQueuesService,
];