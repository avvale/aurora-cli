/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
// export commands
export { CommonCreateResourceCommand } from './application/create/common-create-resource.command';
export { CommonDeleteResourceByIdCommand } from './application/delete/common-delete-resource-by-id.command';
export { CommonUpdateResourceByIdCommand } from './application/update/common-update-resource-by-id.command';

// export queries
export { CommonFindResourceByIdQuery } from './application/find/common-find-resource-by-id.query';
export { CommonFindResourceQuery } from './application/find/common-find-resource.query';
export { CommonGetResourcesQuery } from './application/get/common-get-resources.query';
export { CommonPaginateResourcesQuery } from './application/paginate/common-paginate-resources.query';

// export mocks
export { commonMockResourceData } from './infrastructure/mock/common-mock-resource.data';
export { CommonMockResourceRepository } from './infrastructure/mock/common-mock-resource.repository';
export { CommonMockResourceSeeder } from './infrastructure/mock/common-mock-resource.seeder';

// export events
export { CommonAddResourcesContextEvent } from './application/events/common-add-resources-context.event';
export { CommonCreatedResourceEvent } from './application/events/common-created-resource.event';
export { CommonCreatedResourcesEvent } from './application/events/common-created-resources.event';
export { CommonDeletedResourceEvent } from './application/events/common-deleted-resource.event';
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
import { CommonDeleteResourceByIdCommandHandler } from './application/delete/common-delete-resource-by-id.command-handler';
import { CommonUpdateResourceByIdCommandHandler } from './application/update/common-update-resource-by-id.command-handler';

// query handlers
import { CommonFindResourceByIdQueryHandler } from './application/find/common-find-resource-by-id.query-handler';
import { CommonFindResourceQueryHandler } from './application/find/common-find-resource.query-handler';
import { CommonGetResourcesQueryHandler } from './application/get/common-get-resources.query-handler';
import { CommonPaginateResourcesQueryHandler } from './application/paginate/common-paginate-resources.query-handler';

// event handlers
import { CommonCreatedResourceEventHandler } from './application/events/common-created-resource.event-handler';
import { CommonCreatedResourcesEventHandler } from './application/events/common-created-resources.event-handler';
import { CommonDeletedResourceEventHandler } from './application/events/common-deleted-resource.event-handler';
import { CommonUpdatedResourceEventHandler } from './application/events/common-updated-resource.event-handler';

// services
import { CommonCreateResourceService } from './application/create/common-create-resource.service';
import { CommonDeleteResourceByIdService } from './application/delete/common-delete-resource-by-id.service';
import { CommonFindResourceByIdService } from './application/find/common-find-resource-by-id.service';
import { CommonFindResourceService } from './application/find/common-find-resource.service';
import { CommonGetResourcesService } from './application/get/common-get-resources.service';
import { CommonPaginateResourcesService } from './application/paginate/common-paginate-resources.service';
import { CommonUpdateResourceByIdService } from './application/update/common-update-resource-by-id.service';

export const CommonResourceHandlers = [
  // commands
  CommonCreateResourceCommandHandler,
  CommonUpdateResourceByIdCommandHandler,
  CommonDeleteResourceByIdCommandHandler,

  // queries
  CommonPaginateResourcesQueryHandler,
  CommonGetResourcesQueryHandler,
  CommonFindResourceQueryHandler,
  CommonFindResourceByIdQueryHandler,

  // events
  CommonCreatedResourceEventHandler,
  CommonCreatedResourcesEventHandler,
  CommonUpdatedResourceEventHandler,
  CommonDeletedResourceEventHandler,
];

export const CommonResourceServices = [
  CommonCreateResourceService,
  CommonPaginateResourcesService,
  CommonGetResourcesService,
  CommonFindResourceService,
  CommonFindResourceByIdService,
  CommonUpdateResourceByIdService,
  CommonDeleteResourceByIdService,
];
