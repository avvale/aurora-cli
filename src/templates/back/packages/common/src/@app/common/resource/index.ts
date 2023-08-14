// export commands
export { CommonCreateResourceCommand } from './application/create/common-create-resource.command';
export { CommonCreateResourcesCommand } from './application/create/common-create-resources.command';
export { CommonUpdateResourceByIdCommand } from './application/update/common-update-resource-by-id.command';
export { CommonUpdateResourcesCommand } from './application/update/common-update-resources.command';
export { CommonUpsertResourceCommand } from './application/upsert/common-upsert-resource.command';
export { CommonDeleteResourceByIdCommand } from './application/delete/common-delete-resource-by-id.command';
export { CommonDeleteResourcesCommand } from './application/delete/common-delete-resources.command';

// export queries
export { CommonPaginateResourcesQuery } from './application/paginate/common-paginate-resources.query';
export { CommonGetResourcesQuery } from './application/get/common-get-resources.query';
export { CommonFindResourceQuery } from './application/find/common-find-resource.query';
export { CommonFindResourceByIdQuery } from './application/find/common-find-resource-by-id.query';
export { CommonRawSQLResourcesQuery } from './application/raw-sql/common-raw-sql-resources.query';

// export mocks
export { commonMockResourceData } from './infrastructure/mock/common-mock-resource.data';
export { CommonMockResourceSeeder } from './infrastructure/mock/common-mock-resource.seeder';
export { CommonMockResourceRepository } from './infrastructure/mock/common-mock-resource.repository';

// export events
export { CommonAddResourcesContextEvent } from './application/events/common-add-resources-context.event';
export { CommonCreatedResourcesEvent } from './application/events/common-created-resources.event';
export { CommonCreatedResourceEvent } from './application/events/common-created-resource.event';
export { CommonDeletedResourcesEvent } from './application/events/common-deleted-resources.event';
export { CommonDeletedResourceEvent } from './application/events/common-deleted-resource.event';
export { CommonUpdatedResourcesEvent } from './application/events/common-updated-resources.event';
export { CommonUpdatedResourceEvent } from './application/events/common-updated-resource.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { CommonResource } from './domain/common-resource.aggregate';
export { CommonResourceMapper } from './domain/common-resource.mapper';
export { CommonIResourceRepository } from './domain/common-resource.repository';
export { CommonResourceResponse } from './domain/common-resource.response';

// infrastructure
export { CommonResourceModel } from './infrastructure/sequelize/common-sequelize-resource.model';
export { CommonSequelizeResourceRepository } from './infrastructure/sequelize/common-sequelize-resource.repository';

// sagas
export { CommonResourceSagas } from './application/sagas/common-resource.sagas';

// command handlers
import { CommonCreateResourceCommandHandler } from './application/create/common-create-resource.command-handler';
import { CommonCreateResourcesCommandHandler } from './application/create/common-create-resources.command-handler';
import { CommonUpdateResourceByIdCommandHandler } from './application/update/common-update-resource-by-id.command-handler';
import { CommonUpdateResourcesCommandHandler } from './application/update/common-update-resources.command-handler';
import { CommonUpsertResourceCommandHandler } from './application/upsert/common-upsert-resource.command-handler';
import { CommonDeleteResourceByIdCommandHandler } from './application/delete/common-delete-resource-by-id.command-handler';
import { CommonDeleteResourcesCommandHandler } from './application/delete/common-delete-resources.command-handler';

// query handlers
import { CommonPaginateResourcesQueryHandler } from './application/paginate/common-paginate-resources.query-handler';
import { CommonGetResourcesQueryHandler } from './application/get/common-get-resources.query-handler';
import { CommonFindResourceQueryHandler } from './application/find/common-find-resource.query-handler';
import { CommonFindResourceByIdQueryHandler } from './application/find/common-find-resource-by-id.query-handler';
import { CommonRawSQLResourcesQueryHandler } from './application/raw-sql/common-raw-sql-resources.query-handler';

// event handlers
import { CommonCreatedResourceEventHandler } from './application/events/common-created-resource.event-handler';
import { CommonCreatedResourcesEventHandler } from './application/events/common-created-resources.event-handler';
import { CommonUpdatedResourceEventHandler } from './application/events/common-updated-resource.event-handler';
import { CommonUpdatedResourcesEventHandler } from './application/events/common-updated-resources.event-handler';
import { CommonDeletedResourceEventHandler } from './application/events/common-deleted-resource.event-handler';
import { CommonDeletedResourcesEventHandler } from './application/events/common-deleted-resources.event-handler';

// services
import { CommonCreateResourceService } from './application/create/common-create-resource.service';
import { CommonCreateResourcesService } from './application/create/common-create-resources.service';
import { CommonPaginateResourcesService } from './application/paginate/common-paginate-resources.service';
import { CommonGetResourcesService } from './application/get/common-get-resources.service';
import { CommonFindResourceService } from './application/find/common-find-resource.service';
import { CommonFindResourceByIdService } from './application/find/common-find-resource-by-id.service';
import { CommonRawSQLResourcesService } from './application/raw-sql/common-raw-sql-resources.service';
import { CommonUpdateResourceByIdService } from './application/update/common-update-resource-by-id.service';
import { CommonUpdateResourcesService } from './application/update/common-update-resources.service';
import { CommonUpsertResourceService } from './application/upsert/common-upsert-resource.service';
import { CommonDeleteResourceByIdService } from './application/delete/common-delete-resource-by-id.service';
import { CommonDeleteResourcesService } from './application/delete/common-delete-resources.service';

export const CommonResourceHandlers = [
    // commands
    CommonCreateResourceCommandHandler,
    CommonCreateResourcesCommandHandler,
    CommonUpdateResourceByIdCommandHandler,
    CommonUpdateResourcesCommandHandler,
    CommonUpsertResourceCommandHandler,
    CommonDeleteResourceByIdCommandHandler,
    CommonDeleteResourcesCommandHandler,

    // queries
    CommonPaginateResourcesQueryHandler,
    CommonGetResourcesQueryHandler,
    CommonFindResourceQueryHandler,
    CommonFindResourceByIdQueryHandler,
    CommonRawSQLResourcesQueryHandler,

    // events
    CommonCreatedResourceEventHandler,
    CommonCreatedResourcesEventHandler,
    CommonUpdatedResourceEventHandler,
    CommonUpdatedResourcesEventHandler,
    CommonDeletedResourceEventHandler,
    CommonDeletedResourcesEventHandler,
];

export const CommonResourceServices = [
    CommonCreateResourceService,
    CommonCreateResourcesService,
    CommonPaginateResourcesService,
    CommonGetResourcesService,
    CommonFindResourceService,
    CommonFindResourceByIdService,
    CommonRawSQLResourcesService,
    CommonUpdateResourceByIdService,
    CommonUpdateResourcesService,
    CommonUpsertResourceService,
    CommonDeleteResourceByIdService,
    CommonDeleteResourcesService,
];