/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
/* #region customizations */
export { IamPermissionHelper } from './domain/iam-permission-helper';
/* #endregion customizations */

// export commands
export { IamCreatePermissionCommand } from './application/create/iam-create-permission.command';
export { IamCreatePermissionsCommand } from './application/create/iam-create-permissions.command';
export { IamDeletePermissionByIdCommand } from './application/delete/iam-delete-permission-by-id.command';
export { IamDeletePermissionsCommand } from './application/delete/iam-delete-permissions.command';
export { IamUpdatePermissionByIdCommand } from './application/update/iam-update-permission-by-id.command';
export { IamUpdatePermissionsCommand } from './application/update/iam-update-permissions.command';

// export queries
export { IamFindPermissionByIdQuery } from './application/find/iam-find-permission-by-id.query';
export { IamFindPermissionQuery } from './application/find/iam-find-permission.query';
export { IamGetPermissionsQuery } from './application/get/iam-get-permissions.query';
export { IamPaginatePermissionsQuery } from './application/paginate/iam-paginate-permissions.query';

// export mocks
export { iamMockPermissionData } from './infrastructure/mock/iam-mock-permission.data';
export { IamMockPermissionRepository } from './infrastructure/mock/iam-mock-permission.repository';
export { IamMockPermissionSeeder } from './infrastructure/mock/iam-mock-permission.seeder';

// export events
export { IamAddPermissionsContextEvent } from './application/events/iam-add-permissions-context.event';
export { IamCreatedPermissionEvent } from './application/events/iam-created-permission.event';
export { IamCreatedPermissionsEvent } from './application/events/iam-created-permissions.event';
export { IamDeletedPermissionEvent } from './application/events/iam-deleted-permission.event';
export { IamDeletedPermissionsEvent } from './application/events/iam-deleted-permissions.event';
export { IamUpdatedPermissionEvent } from './application/events/iam-updated-permission.event';
export { IamUpdatedPermissionsEvent } from './application/events/iam-updated-permissions.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { IamPermission } from './domain/iam-permission.aggregate';
export { IamPermissionMapper } from './domain/iam-permission.mapper';
export { IamIPermissionRepository } from './domain/iam-permission.repository';
export { IamPermissionResponse } from './domain/iam-permission.response';

// infrastructure
export { IamPermissionModel } from './infrastructure/sequelize/iam-sequelize-permission.model';
export { IamSequelizePermissionRepository } from './infrastructure/sequelize/iam-sequelize-permission.repository';

// sagas
export { IamPermissionSagas } from './application/sagas/iam-permission.sagas';

// command handlers
import { IamCreatePermissionCommandHandler } from './application/create/iam-create-permission.command-handler';
import { IamCreatePermissionsCommandHandler } from './application/create/iam-create-permissions.command-handler';
import { IamDeletePermissionByIdCommandHandler } from './application/delete/iam-delete-permission-by-id.command-handler';
import { IamDeletePermissionsCommandHandler } from './application/delete/iam-delete-permissions.command-handler';
import { IamUpdatePermissionByIdCommandHandler } from './application/update/iam-update-permission-by-id.command-handler';
import { IamUpdatePermissionsCommandHandler } from './application/update/iam-update-permissions.command-handler';

// query handlers
import { IamFindPermissionByIdQueryHandler } from './application/find/iam-find-permission-by-id.query-handler';
import { IamFindPermissionQueryHandler } from './application/find/iam-find-permission.query-handler';
import { IamGetPermissionsQueryHandler } from './application/get/iam-get-permissions.query-handler';
import { IamPaginatePermissionsQueryHandler } from './application/paginate/iam-paginate-permissions.query-handler';

// event handlers
import { IamCreatedPermissionEventHandler } from './application/events/iam-created-permission.event-handler';
import { IamCreatedPermissionsEventHandler } from './application/events/iam-created-permissions.event-handler';
import { IamDeletedPermissionEventHandler } from './application/events/iam-deleted-permission.event-handler';
import { IamDeletedPermissionsEventHandler } from './application/events/iam-deleted-permissions.event-handler';
import { IamUpdatedPermissionEventHandler } from './application/events/iam-updated-permission.event-handler';
import { IamUpdatedPermissionsEventHandler } from './application/events/iam-updated-permissions.event-handler';

// services
import { IamCreatePermissionService } from './application/create/iam-create-permission.service';
import { IamCreatePermissionsService } from './application/create/iam-create-permissions.service';
import { IamDeletePermissionByIdService } from './application/delete/iam-delete-permission-by-id.service';
import { IamDeletePermissionsService } from './application/delete/iam-delete-permissions.service';
import { IamFindPermissionByIdService } from './application/find/iam-find-permission-by-id.service';
import { IamFindPermissionService } from './application/find/iam-find-permission.service';
import { IamGetPermissionsService } from './application/get/iam-get-permissions.service';
import { IamPaginatePermissionsService } from './application/paginate/iam-paginate-permissions.service';
import { IamUpdatePermissionByIdService } from './application/update/iam-update-permission-by-id.service';
import { IamUpdatePermissionsService } from './application/update/iam-update-permissions.service';

export const IamPermissionHandlers = [
  // commands
  IamCreatePermissionCommandHandler,
  IamCreatePermissionsCommandHandler,
  IamUpdatePermissionByIdCommandHandler,
  IamUpdatePermissionsCommandHandler,
  IamDeletePermissionByIdCommandHandler,
  IamDeletePermissionsCommandHandler,

  // queries
  IamPaginatePermissionsQueryHandler,
  IamGetPermissionsQueryHandler,
  IamFindPermissionQueryHandler,
  IamFindPermissionByIdQueryHandler,

  // events
  IamCreatedPermissionEventHandler,
  IamCreatedPermissionsEventHandler,
  IamUpdatedPermissionEventHandler,
  IamUpdatedPermissionsEventHandler,
  IamDeletedPermissionEventHandler,
  IamDeletedPermissionsEventHandler,
];

export const IamPermissionServices = [
  IamCreatePermissionService,
  IamCreatePermissionsService,
  IamPaginatePermissionsService,
  IamGetPermissionsService,
  IamFindPermissionService,
  IamFindPermissionByIdService,
  IamUpdatePermissionByIdService,
  IamUpdatePermissionsService,
  IamDeletePermissionByIdService,
  IamDeletePermissionsService,
];
