// export commands
export { IamCreateTenantCommand } from './application/create/iam-create-tenant.command';
export { IamCreateTenantsCommand } from './application/create/iam-create-tenants.command';
export { IamUpdateTenantByIdCommand } from './application/update/iam-update-tenant-by-id.command';
export { IamUpdateTenantsCommand } from './application/update/iam-update-tenants.command';
export { IamUpdateAndIncrementTenantsCommand } from './application/update/iam-update-and-increment-tenants.command';
export { IamUpsertTenantCommand } from './application/upsert/iam-upsert-tenant.command';
export { IamDeleteTenantByIdCommand } from './application/delete/iam-delete-tenant-by-id.command';
export { IamDeleteTenantsCommand } from './application/delete/iam-delete-tenants.command';

// export queries
export { IamPaginateTenantsQuery } from './application/paginate/iam-paginate-tenants.query';
export { IamGetTenantsQuery } from './application/get/iam-get-tenants.query';
export { IamFindTenantQuery } from './application/find/iam-find-tenant.query';
export { IamFindTenantByIdQuery } from './application/find/iam-find-tenant-by-id.query';
export { IamRawSQLTenantsQuery } from './application/raw-sql/iam-raw-sql-tenants.query';
export { IamCountTenantQuery } from './application/count/iam-count-tenant.query';
export { IamMaxTenantQuery } from './application/max/iam-max-tenant.query';
export { IamMinTenantQuery } from './application/min/iam-min-tenant.query';
export { IamSumTenantQuery } from './application/sum/iam-sum-tenant.query';

// export mocks
export { iamMockTenantData } from './infrastructure/mock/iam-mock-tenant.data';
export { IamMockTenantSeeder } from './infrastructure/mock/iam-mock-tenant.seeder';
export { IamMockTenantRepository } from './infrastructure/mock/iam-mock-tenant.repository';

// export events
export { IamAddTenantsContextEvent } from './application/events/iam-add-tenants-context.event';
export { IamCreatedTenantsEvent } from './application/events/iam-created-tenants.event';
export { IamCreatedTenantEvent } from './application/events/iam-created-tenant.event';
export { IamDeletedTenantsEvent } from './application/events/iam-deleted-tenants.event';
export { IamDeletedTenantEvent } from './application/events/iam-deleted-tenant.event';
export { IamUpdatedTenantsEvent } from './application/events/iam-updated-tenants.event';
export { IamUpdatedTenantEvent } from './application/events/iam-updated-tenant.event';
export { IamUpdatedAndIncrementedTenantsEvent } from './application/events/iam-updated-and-incremented-tenants.event';
export { IamUpdatedAndIncrementedTenantEvent } from './application/events/iam-updated-and-incremented-tenant.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { IamTenant } from './domain/iam-tenant.aggregate';
export { IamTenantMapper } from './domain/iam-tenant.mapper';
export { IamITenantRepository } from './domain/iam-tenant.repository';
export { IamTenantResponse } from './domain/iam-tenant.response';

// infrastructure
export { IamTenantModel } from './infrastructure/sequelize/iam-sequelize-tenant.model';
export { IamSequelizeTenantRepository } from './infrastructure/sequelize/iam-sequelize-tenant.repository';

// sagas
export { IamTenantSagas } from './application/sagas/iam-tenant.sagas';

// command handlers
import { IamCreateTenantCommandHandler } from './application/create/iam-create-tenant.command-handler';
import { IamCreateTenantsCommandHandler } from './application/create/iam-create-tenants.command-handler';
import { IamUpdateTenantByIdCommandHandler } from './application/update/iam-update-tenant-by-id.command-handler';
import { IamUpdateTenantsCommandHandler } from './application/update/iam-update-tenants.command-handler';
import { IamUpdateAndIncrementTenantsCommandHandler } from './application/update/iam-update-and-increment-tenants.command-handler';
import { IamUpsertTenantCommandHandler } from './application/upsert/iam-upsert-tenant.command-handler';
import { IamDeleteTenantByIdCommandHandler } from './application/delete/iam-delete-tenant-by-id.command-handler';
import { IamDeleteTenantsCommandHandler } from './application/delete/iam-delete-tenants.command-handler';

// query handlers
import { IamPaginateTenantsQueryHandler } from './application/paginate/iam-paginate-tenants.query-handler';
import { IamGetTenantsQueryHandler } from './application/get/iam-get-tenants.query-handler';
import { IamFindTenantQueryHandler } from './application/find/iam-find-tenant.query-handler';
import { IamFindTenantByIdQueryHandler } from './application/find/iam-find-tenant-by-id.query-handler';
import { IamRawSQLTenantsQueryHandler } from './application/raw-sql/iam-raw-sql-tenants.query-handler';
import { IamCountTenantQueryHandler } from './application/count/iam-count-tenant.query-handler';
import { IamMaxTenantQueryHandler } from './application/max/iam-max-tenant.query-handler';
import { IamMinTenantQueryHandler } from './application/min/iam-min-tenant.query-handler';
import { IamSumTenantQueryHandler } from './application/sum/iam-sum-tenant.query-handler';

// event handlers
import { IamCreatedTenantEventHandler } from './application/events/iam-created-tenant.event-handler';
import { IamCreatedTenantsEventHandler } from './application/events/iam-created-tenants.event-handler';
import { IamUpdatedTenantEventHandler } from './application/events/iam-updated-tenant.event-handler';
import { IamUpdatedTenantsEventHandler } from './application/events/iam-updated-tenants.event-handler';
import { IamUpdatedAndIncrementedTenantsEventHandler } from './application/events/iam-updated-and-incremented-tenants.event-handler';
import { IamDeletedTenantEventHandler } from './application/events/iam-deleted-tenant.event-handler';
import { IamDeletedTenantsEventHandler } from './application/events/iam-deleted-tenants.event-handler';

// services
import { IamCreateTenantService } from './application/create/iam-create-tenant.service';
import { IamCreateTenantsService } from './application/create/iam-create-tenants.service';
import { IamPaginateTenantsService } from './application/paginate/iam-paginate-tenants.service';
import { IamGetTenantsService } from './application/get/iam-get-tenants.service';
import { IamFindTenantService } from './application/find/iam-find-tenant.service';
import { IamFindTenantByIdService } from './application/find/iam-find-tenant-by-id.service';
import { IamRawSQLTenantsService } from './application/raw-sql/iam-raw-sql-tenants.service';
import { IamCountTenantService } from './application/count/iam-count-tenant.service';
import { IamMaxTenantService } from './application/max/iam-max-tenant.service';
import { IamMinTenantService } from './application/min/iam-min-tenant.service';
import { IamSumTenantService } from './application/sum/iam-sum-tenant.service';
import { IamUpdateTenantByIdService } from './application/update/iam-update-tenant-by-id.service';
import { IamUpdateTenantsService } from './application/update/iam-update-tenants.service';
import { IamUpdateAndIncrementTenantsService } from './application/update/iam-update-and-increment-tenants.service';
import { IamUpsertTenantService } from './application/upsert/iam-upsert-tenant.service';
import { IamDeleteTenantByIdService } from './application/delete/iam-delete-tenant-by-id.service';
import { IamDeleteTenantsService } from './application/delete/iam-delete-tenants.service';

export const IamTenantHandlers = [
    // commands
    IamCreateTenantCommandHandler,
    IamCreateTenantsCommandHandler,
    IamUpdateTenantByIdCommandHandler,
    IamUpdateTenantsCommandHandler,
    IamUpdateAndIncrementTenantsCommandHandler,
    IamUpsertTenantCommandHandler,
    IamDeleteTenantByIdCommandHandler,
    IamDeleteTenantsCommandHandler,

    // queries
    IamPaginateTenantsQueryHandler,
    IamGetTenantsQueryHandler,
    IamFindTenantQueryHandler,
    IamFindTenantByIdQueryHandler,
    IamRawSQLTenantsQueryHandler,
    IamCountTenantQueryHandler,
    IamMaxTenantQueryHandler,
    IamMinTenantQueryHandler,
    IamSumTenantQueryHandler,

    // events
    IamCreatedTenantEventHandler,
    IamCreatedTenantsEventHandler,
    IamUpdatedTenantEventHandler,
    IamUpdatedTenantsEventHandler,
    IamUpdatedAndIncrementedTenantsEventHandler,
    IamDeletedTenantEventHandler,
    IamDeletedTenantsEventHandler,
];

export const IamTenantServices = [
    IamCreateTenantService,
    IamCreateTenantsService,
    IamPaginateTenantsService,
    IamGetTenantsService,
    IamFindTenantService,
    IamFindTenantByIdService,
    IamRawSQLTenantsService,
    IamCountTenantService,
    IamMaxTenantService,
    IamMinTenantService,
    IamSumTenantService,
    IamUpdateTenantByIdService,
    IamUpdateTenantsService,
    IamUpdateAndIncrementTenantsService,
    IamUpsertTenantService,
    IamDeleteTenantByIdService,
    IamDeleteTenantsService,
];