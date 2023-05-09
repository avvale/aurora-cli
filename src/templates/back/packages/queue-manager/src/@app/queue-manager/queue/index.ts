// commands
import { CreateQueueCommandHandler } from './application/create/create-queue.command-handler';
import { CreateQueuesCommandHandler } from './application/create/create-queues.command-handler';
import { UpdateQueueByIdCommandHandler } from './application/update/update-queue-by-id.command-handler';
import { UpdateQueuesCommandHandler } from './application/update/update-queues.command-handler';
import { UpsertQueueCommandHandler } from './application/upsert/upsert-queue.command-handler';
import { DeleteQueueByIdCommandHandler } from './application/delete/delete-queue-by-id.command-handler';
import { DeleteQueuesCommandHandler } from './application/delete/delete-queues.command-handler';

// queries
import { PaginateQueuesQueryHandler } from './application/paginate/paginate-queues.query-handler';
import { GetQueuesQueryHandler } from './application/get/get-queues.query-handler';
import { FindQueueQueryHandler } from './application/find/find-queue.query-handler';
import { FindQueueByIdQueryHandler } from './application/find/find-queue-by-id.query-handler';
import { RawSQLQueuesQueryHandler } from './application/raw-sql/raw-sql-queues.query-handler';

// events
import { CreatedQueueEventHandler } from './application/events/created-queue.event-handler';
import { CreatedQueuesEventHandler } from './application/events/created-queues.event-handler';
import { UpdatedQueueEventHandler } from './application/events/updated-queue.event-handler';
import { UpdatedQueuesEventHandler } from './application/events/updated-queues.event-handler';
import { DeletedQueueEventHandler } from './application/events/deleted-queue.event-handler';
import { DeletedQueuesEventHandler } from './application/events/deleted-queues.event-handler';

// services
import { CreateQueueService } from './application/create/create-queue.service';
import { CreateQueuesService } from './application/create/create-queues.service';
import { PaginateQueuesService } from './application/paginate/paginate-queues.service';
import { GetQueuesService } from './application/get/get-queues.service';
import { FindQueueService } from './application/find/find-queue.service';
import { FindQueueByIdService } from './application/find/find-queue-by-id.service';
import { RawSQLQueuesService } from './application/raw-sql/raw-sql-queues.service';
import { UpdateQueueByIdService } from './application/update/update-queue-by-id.service';
import { UpdateQueuesService } from './application/update/update-queues.service';
import { UpsertQueueService } from './application/upsert/upsert-queue.service';
import { DeleteQueueByIdService } from './application/delete/delete-queue-by-id.service';
import { DeleteQueuesService } from './application/delete/delete-queues.service';

// models
export { QueueManagerQueueModel } from './infrastructure/sequelize/sequelize-queue.model';

// repository
export { IQueueRepository } from './domain/queue.repository';
export { SequelizeQueueRepository } from './infrastructure/sequelize/sequelize-queue.repository';

// sagas
export { QueueSagas } from './application/sagas/queue.sagas';

export const QueueManagerQueueHandlers = [
    // commands
    CreateQueueCommandHandler,
    CreateQueuesCommandHandler,
    UpdateQueueByIdCommandHandler,
    UpdateQueuesCommandHandler,
    UpsertQueueCommandHandler,
    DeleteQueueByIdCommandHandler,
    DeleteQueuesCommandHandler,

    // queries
    PaginateQueuesQueryHandler,
    GetQueuesQueryHandler,
    FindQueueQueryHandler,
    FindQueueByIdQueryHandler,
    RawSQLQueuesQueryHandler,

    // events
    CreatedQueueEventHandler,
    CreatedQueuesEventHandler,
    UpdatedQueueEventHandler,
    UpdatedQueuesEventHandler,
    DeletedQueueEventHandler,
    DeletedQueuesEventHandler,
];

export const QueueManagerQueueServices = [
    CreateQueueService,
    CreateQueuesService,
    PaginateQueuesService,
    GetQueuesService,
    FindQueueService,
    FindQueueByIdService,
    RawSQLQueuesService,
    UpdateQueueByIdService,
    UpdateQueuesService,
    UpsertQueueService,
    DeleteQueueByIdService,
    DeleteQueuesService,
];