// export commands
export { QueueManagerCreateJobRegistryCommand } from './application/create/queue-manager-create-job-registry.command';
export { QueueManagerCreateJobsRegistryCommand } from './application/create/queue-manager-create-jobs-registry.command';
export { QueueManagerUpdateJobRegistryByIdCommand } from './application/update/queue-manager-update-job-registry-by-id.command';
export { QueueManagerUpdateJobsRegistryCommand } from './application/update/queue-manager-update-jobs-registry.command';
export { QueueManagerUpdateAndIncrementJobsRegistryCommand } from './application/update/queue-manager-update-and-increment-jobs-registry.command';
export { QueueManagerUpsertJobRegistryCommand } from './application/upsert/queue-manager-upsert-job-registry.command';
export { QueueManagerDeleteJobRegistryByIdCommand } from './application/delete/queue-manager-delete-job-registry-by-id.command';
export { QueueManagerDeleteJobsRegistryCommand } from './application/delete/queue-manager-delete-jobs-registry.command';

// export queries
export { QueueManagerPaginateJobsRegistryQuery } from './application/paginate/queue-manager-paginate-jobs-registry.query';
export { QueueManagerGetJobsRegistryQuery } from './application/get/queue-manager-get-jobs-registry.query';
export { QueueManagerFindJobRegistryQuery } from './application/find/queue-manager-find-job-registry.query';
export { QueueManagerFindJobRegistryByIdQuery } from './application/find/queue-manager-find-job-registry-by-id.query';
export { QueueManagerRawSQLJobsRegistryQuery } from './application/raw-sql/queue-manager-raw-sql-jobs-registry.query';
export { QueueManagerCountJobRegistryQuery } from './application/count/queue-manager-count-job-registry.query';
export { QueueManagerMaxJobRegistryQuery } from './application/max/queue-manager-max-job-registry.query';
export { QueueManagerMinJobRegistryQuery } from './application/min/queue-manager-min-job-registry.query';
export { QueueManagerSumJobRegistryQuery } from './application/sum/queue-manager-sum-job-registry.query';

// export mocks
export { queueManagerMockJobRegistryData } from './infrastructure/mock/queue-manager-mock-job-registry.data';
export { QueueManagerMockJobRegistrySeeder } from './infrastructure/mock/queue-manager-mock-job-registry.seeder';
export { QueueManagerMockJobRegistryRepository } from './infrastructure/mock/queue-manager-mock-job-registry.repository';

// export events
export { QueueManagerAddJobsRegistryContextEvent } from './application/events/queue-manager-add-jobs-registry-context.event';
export { QueueManagerCreatedJobsRegistryEvent } from './application/events/queue-manager-created-jobs-registry.event';
export { QueueManagerCreatedJobRegistryEvent } from './application/events/queue-manager-created-job-registry.event';
export { QueueManagerDeletedJobsRegistryEvent } from './application/events/queue-manager-deleted-jobs-registry.event';
export { QueueManagerDeletedJobRegistryEvent } from './application/events/queue-manager-deleted-job-registry.event';
export { QueueManagerUpdatedJobsRegistryEvent } from './application/events/queue-manager-updated-jobs-registry.event';
export { QueueManagerUpdatedJobRegistryEvent } from './application/events/queue-manager-updated-job-registry.event';
export { QueueManagerUpdatedAndIncrementedJobsRegistryEvent } from './application/events/queue-manager-updated-and-incremented-jobs-registry.event';
export { QueueManagerUpdatedAndIncrementedJobRegistryEvent } from './application/events/queue-manager-updated-and-incremented-job-registry.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { QueueManagerJobRegistry } from './domain/queue-manager-job-registry.aggregate';
export { QueueManagerJobRegistryMapper } from './domain/queue-manager-job-registry.mapper';
export { QueueManagerIJobRegistryRepository } from './domain/queue-manager-job-registry.repository';
export { QueueManagerJobRegistryResponse } from './domain/queue-manager-job-registry.response';

// infrastructure
export { QueueManagerJobRegistryModel } from './infrastructure/sequelize/queue-manager-sequelize-job-registry.model';
export { QueueManagerSequelizeJobRegistryRepository } from './infrastructure/sequelize/queue-manager-sequelize-job-registry.repository';

// sagas
export { QueueManagerJobRegistrySagas } from './application/sagas/queue-manager-job-registry.sagas';

// command handlers
import { QueueManagerCreateJobRegistryCommandHandler } from './application/create/queue-manager-create-job-registry.command-handler';
import { QueueManagerCreateJobsRegistryCommandHandler } from './application/create/queue-manager-create-jobs-registry.command-handler';
import { QueueManagerUpdateJobRegistryByIdCommandHandler } from './application/update/queue-manager-update-job-registry-by-id.command-handler';
import { QueueManagerUpdateJobsRegistryCommandHandler } from './application/update/queue-manager-update-jobs-registry.command-handler';
import { QueueManagerUpdateAndIncrementJobsRegistryCommandHandler } from './application/update/queue-manager-update-and-increment-jobs-registry.command-handler';
import { QueueManagerUpsertJobRegistryCommandHandler } from './application/upsert/queue-manager-upsert-job-registry.command-handler';
import { QueueManagerDeleteJobRegistryByIdCommandHandler } from './application/delete/queue-manager-delete-job-registry-by-id.command-handler';
import { QueueManagerDeleteJobsRegistryCommandHandler } from './application/delete/queue-manager-delete-jobs-registry.command-handler';

// query handlers
import { QueueManagerPaginateJobsRegistryQueryHandler } from './application/paginate/queue-manager-paginate-jobs-registry.query-handler';
import { QueueManagerGetJobsRegistryQueryHandler } from './application/get/queue-manager-get-jobs-registry.query-handler';
import { QueueManagerFindJobRegistryQueryHandler } from './application/find/queue-manager-find-job-registry.query-handler';
import { QueueManagerFindJobRegistryByIdQueryHandler } from './application/find/queue-manager-find-job-registry-by-id.query-handler';
import { QueueManagerRawSQLJobsRegistryQueryHandler } from './application/raw-sql/queue-manager-raw-sql-jobs-registry.query-handler';
import { QueueManagerCountJobRegistryQueryHandler } from './application/count/queue-manager-count-job-registry.query-handler';
import { QueueManagerMaxJobRegistryQueryHandler } from './application/max/queue-manager-max-job-registry.query-handler';
import { QueueManagerMinJobRegistryQueryHandler } from './application/min/queue-manager-min-job-registry.query-handler';
import { QueueManagerSumJobRegistryQueryHandler } from './application/sum/queue-manager-sum-job-registry.query-handler';

// event handlers
import { QueueManagerCreatedJobRegistryEventHandler } from './application/events/queue-manager-created-job-registry.event-handler';
import { QueueManagerCreatedJobsRegistryEventHandler } from './application/events/queue-manager-created-jobs-registry.event-handler';
import { QueueManagerUpdatedJobRegistryEventHandler } from './application/events/queue-manager-updated-job-registry.event-handler';
import { QueueManagerUpdatedJobsRegistryEventHandler } from './application/events/queue-manager-updated-jobs-registry.event-handler';
import { QueueManagerUpdatedAndIncrementedJobsRegistryEventHandler } from './application/events/queue-manager-updated-and-incremented-jobs-registry.event-handler';
import { QueueManagerDeletedJobRegistryEventHandler } from './application/events/queue-manager-deleted-job-registry.event-handler';
import { QueueManagerDeletedJobsRegistryEventHandler } from './application/events/queue-manager-deleted-jobs-registry.event-handler';

// services
import { QueueManagerCreateJobRegistryService } from './application/create/queue-manager-create-job-registry.service';
import { QueueManagerCreateJobsRegistryService } from './application/create/queue-manager-create-jobs-registry.service';
import { QueueManagerPaginateJobsRegistryService } from './application/paginate/queue-manager-paginate-jobs-registry.service';
import { QueueManagerGetJobsRegistryService } from './application/get/queue-manager-get-jobs-registry.service';
import { QueueManagerFindJobRegistryService } from './application/find/queue-manager-find-job-registry.service';
import { QueueManagerFindJobRegistryByIdService } from './application/find/queue-manager-find-job-registry-by-id.service';
import { QueueManagerRawSQLJobsRegistryService } from './application/raw-sql/queue-manager-raw-sql-jobs-registry.service';
import { QueueManagerCountJobRegistryService } from './application/count/queue-manager-count-job-registry.service';
import { QueueManagerMaxJobRegistryService } from './application/max/queue-manager-max-job-registry.service';
import { QueueManagerMinJobRegistryService } from './application/min/queue-manager-min-job-registry.service';
import { QueueManagerSumJobRegistryService } from './application/sum/queue-manager-sum-job-registry.service';
import { QueueManagerUpdateJobRegistryByIdService } from './application/update/queue-manager-update-job-registry-by-id.service';
import { QueueManagerUpdateJobsRegistryService } from './application/update/queue-manager-update-jobs-registry.service';
import { QueueManagerUpdateAndIncrementJobsRegistryService } from './application/update/queue-manager-update-and-increment-jobs-registry.service';
import { QueueManagerUpsertJobRegistryService } from './application/upsert/queue-manager-upsert-job-registry.service';
import { QueueManagerDeleteJobRegistryByIdService } from './application/delete/queue-manager-delete-job-registry-by-id.service';
import { QueueManagerDeleteJobsRegistryService } from './application/delete/queue-manager-delete-jobs-registry.service';

export const QueueManagerJobRegistryHandlers = [
    // commands
    QueueManagerCreateJobRegistryCommandHandler,
    QueueManagerCreateJobsRegistryCommandHandler,
    QueueManagerUpdateJobRegistryByIdCommandHandler,
    QueueManagerUpdateJobsRegistryCommandHandler,
    QueueManagerUpdateAndIncrementJobsRegistryCommandHandler,
    QueueManagerUpsertJobRegistryCommandHandler,
    QueueManagerDeleteJobRegistryByIdCommandHandler,
    QueueManagerDeleteJobsRegistryCommandHandler,

    // queries
    QueueManagerPaginateJobsRegistryQueryHandler,
    QueueManagerGetJobsRegistryQueryHandler,
    QueueManagerFindJobRegistryQueryHandler,
    QueueManagerFindJobRegistryByIdQueryHandler,
    QueueManagerRawSQLJobsRegistryQueryHandler,
    QueueManagerCountJobRegistryQueryHandler,
    QueueManagerMaxJobRegistryQueryHandler,
    QueueManagerMinJobRegistryQueryHandler,
    QueueManagerSumJobRegistryQueryHandler,

    // events
    QueueManagerCreatedJobRegistryEventHandler,
    QueueManagerCreatedJobsRegistryEventHandler,
    QueueManagerUpdatedJobRegistryEventHandler,
    QueueManagerUpdatedJobsRegistryEventHandler,
    QueueManagerUpdatedAndIncrementedJobsRegistryEventHandler,
    QueueManagerDeletedJobRegistryEventHandler,
    QueueManagerDeletedJobsRegistryEventHandler,
];

export const QueueManagerJobRegistryServices = [
    QueueManagerCreateJobRegistryService,
    QueueManagerCreateJobsRegistryService,
    QueueManagerPaginateJobsRegistryService,
    QueueManagerGetJobsRegistryService,
    QueueManagerFindJobRegistryService,
    QueueManagerFindJobRegistryByIdService,
    QueueManagerRawSQLJobsRegistryService,
    QueueManagerCountJobRegistryService,
    QueueManagerMaxJobRegistryService,
    QueueManagerMinJobRegistryService,
    QueueManagerSumJobRegistryService,
    QueueManagerUpdateJobRegistryByIdService,
    QueueManagerUpdateJobsRegistryService,
    QueueManagerUpdateAndIncrementJobsRegistryService,
    QueueManagerUpsertJobRegistryService,
    QueueManagerDeleteJobRegistryByIdService,
    QueueManagerDeleteJobsRegistryService,
];