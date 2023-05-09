// commands
import { CreateJobRegistryCommandHandler } from './application/create/create-job-registry.command-handler';
import { CreateJobsRegistryCommandHandler } from './application/create/create-jobs-registry.command-handler';
import { UpdateJobRegistryByIdCommandHandler } from './application/update/update-job-registry-by-id.command-handler';
import { UpdateJobsRegistryCommandHandler } from './application/update/update-jobs-registry.command-handler';
import { UpsertJobRegistryCommandHandler } from './application/upsert/upsert-job-registry.command-handler';
import { DeleteJobRegistryByIdCommandHandler } from './application/delete/delete-job-registry-by-id.command-handler';
import { DeleteJobsRegistryCommandHandler } from './application/delete/delete-jobs-registry.command-handler';

// queries
import { PaginateJobsRegistryQueryHandler } from './application/paginate/paginate-jobs-registry.query-handler';
import { GetJobsRegistryQueryHandler } from './application/get/get-jobs-registry.query-handler';
import { FindJobRegistryQueryHandler } from './application/find/find-job-registry.query-handler';
import { FindJobRegistryByIdQueryHandler } from './application/find/find-job-registry-by-id.query-handler';
import { RawSQLJobsRegistryQueryHandler } from './application/raw-sql/raw-sql-jobs-registry.query-handler';

// events
import { CreatedJobRegistryEventHandler } from './application/events/created-job-registry.event-handler';
import { CreatedJobsRegistryEventHandler } from './application/events/created-jobs-registry.event-handler';
import { UpdatedJobRegistryEventHandler } from './application/events/updated-job-registry.event-handler';
import { UpdatedJobsRegistryEventHandler } from './application/events/updated-jobs-registry.event-handler';
import { DeletedJobRegistryEventHandler } from './application/events/deleted-job-registry.event-handler';
import { DeletedJobsRegistryEventHandler } from './application/events/deleted-jobs-registry.event-handler';

// services
import { CreateJobRegistryService } from './application/create/create-job-registry.service';
import { CreateJobsRegistryService } from './application/create/create-jobs-registry.service';
import { PaginateJobsRegistryService } from './application/paginate/paginate-jobs-registry.service';
import { GetJobsRegistryService } from './application/get/get-jobs-registry.service';
import { FindJobRegistryService } from './application/find/find-job-registry.service';
import { FindJobRegistryByIdService } from './application/find/find-job-registry-by-id.service';
import { RawSQLJobsRegistryService } from './application/raw-sql/raw-sql-jobs-registry.service';
import { UpdateJobRegistryByIdService } from './application/update/update-job-registry-by-id.service';
import { UpdateJobsRegistryService } from './application/update/update-jobs-registry.service';
import { UpsertJobRegistryService } from './application/upsert/upsert-job-registry.service';
import { DeleteJobRegistryByIdService } from './application/delete/delete-job-registry-by-id.service';
import { DeleteJobsRegistryService } from './application/delete/delete-jobs-registry.service';

// models
export { QueueManagerJobRegistryModel } from './infrastructure/sequelize/sequelize-job-registry.model';

// repository
export { IJobRegistryRepository } from './domain/job-registry.repository';
export { SequelizeJobRegistryRepository } from './infrastructure/sequelize/sequelize-job-registry.repository';

// sagas
export { JobRegistrySagas } from './application/sagas/job-registry.sagas';

export const QueueManagerJobRegistryHandlers = [
    // commands
    CreateJobRegistryCommandHandler,
    CreateJobsRegistryCommandHandler,
    UpdateJobRegistryByIdCommandHandler,
    UpdateJobsRegistryCommandHandler,
    UpsertJobRegistryCommandHandler,
    DeleteJobRegistryByIdCommandHandler,
    DeleteJobsRegistryCommandHandler,

    // queries
    PaginateJobsRegistryQueryHandler,
    GetJobsRegistryQueryHandler,
    FindJobRegistryQueryHandler,
    FindJobRegistryByIdQueryHandler,
    RawSQLJobsRegistryQueryHandler,

    // events
    CreatedJobRegistryEventHandler,
    CreatedJobsRegistryEventHandler,
    UpdatedJobRegistryEventHandler,
    UpdatedJobsRegistryEventHandler,
    DeletedJobRegistryEventHandler,
    DeletedJobsRegistryEventHandler,
];

export const QueueManagerJobRegistryServices = [
    CreateJobRegistryService,
    CreateJobsRegistryService,
    PaginateJobsRegistryService,
    GetJobsRegistryService,
    FindJobRegistryService,
    FindJobRegistryByIdService,
    RawSQLJobsRegistryService,
    UpdateJobRegistryByIdService,
    UpdateJobsRegistryService,
    UpsertJobRegistryService,
    DeleteJobRegistryByIdService,
    DeleteJobsRegistryService,
];