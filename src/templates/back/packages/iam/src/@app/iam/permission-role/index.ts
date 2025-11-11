// export commands
export { IamCreatePermissionRoleCommand } from './application/create/iam-create-permission-role.command';
export { IamCreatePermissionsRolesCommand } from './application/create/iam-create-permissions-roles.command';
export { IamDeletePermissionRoleByIdCommand } from './application/delete/iam-delete-permission-role-by-id.command';
export { IamDeletePermissionsRolesCommand } from './application/delete/iam-delete-permissions-roles.command';
export { IamUpdatePermissionRoleByIdCommand } from './application/update/iam-update-permission-role-by-id.command';
export { IamUpdatePermissionsRolesCommand } from './application/update/iam-update-permissions-roles.command';

// export queries
export { IamFindPermissionRoleByIdQuery } from './application/find/iam-find-permission-role-by-id.query';
export { IamFindPermissionRoleQuery } from './application/find/iam-find-permission-role.query';
export { IamGetPermissionsRolesQuery } from './application/get/iam-get-permissions-roles.query';
export { IamPaginatePermissionsRolesQuery } from './application/paginate/iam-paginate-permissions-roles.query';

// export mocks
export { iamMockPermissionRoleData } from './infrastructure/mock/iam-mock-permission-role.data';
export { IamMockPermissionRoleRepository } from './infrastructure/mock/iam-mock-permission-role.repository';
export { IamMockPermissionRoleSeeder } from './infrastructure/mock/iam-mock-permission-role.seeder';

// export events
export { IamAddPermissionsRolesContextEvent } from './application/events/iam-add-permissions-roles-context.event';
export { IamCreatedPermissionRoleEvent } from './application/events/iam-created-permission-role.event';
export { IamCreatedPermissionsRolesEvent } from './application/events/iam-created-permissions-roles.event';
export { IamDeletedPermissionRoleEvent } from './application/events/iam-deleted-permission-role.event';
export { IamDeletedPermissionsRolesEvent } from './application/events/iam-deleted-permissions-roles.event';
export { IamUpdatedPermissionRoleEvent } from './application/events/iam-updated-permission-role.event';
export { IamUpdatedPermissionsRolesEvent } from './application/events/iam-updated-permissions-roles.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { IamPermissionRole } from './domain/iam-permission-role.aggregate';
export { IamPermissionRoleMapper } from './domain/iam-permission-role.mapper';
export { IamIPermissionRoleRepository } from './domain/iam-permission-role.repository';
export { IamPermissionRoleResponse } from './domain/iam-permission-role.response';

// infrastructure
export { IamPermissionRoleModel } from './infrastructure/sequelize/iam-sequelize-permission-role.model';
export { IamSequelizePermissionRoleRepository } from './infrastructure/sequelize/iam-sequelize-permission-role.repository';

// sagas
export { IamPermissionRoleSagas } from './application/sagas/iam-permission-role.sagas';

// command handlers
import { IamCreatePermissionRoleCommandHandler } from './application/create/iam-create-permission-role.command-handler';
import { IamCreatePermissionsRolesCommandHandler } from './application/create/iam-create-permissions-roles.command-handler';
import { IamDeletePermissionRoleByIdCommandHandler } from './application/delete/iam-delete-permission-role-by-id.command-handler';
import { IamDeletePermissionsRolesCommandHandler } from './application/delete/iam-delete-permissions-roles.command-handler';
import { IamUpdatePermissionRoleByIdCommandHandler } from './application/update/iam-update-permission-role-by-id.command-handler';
import { IamUpdatePermissionsRolesCommandHandler } from './application/update/iam-update-permissions-roles.command-handler';

// query handlers
import { IamFindPermissionRoleByIdQueryHandler } from './application/find/iam-find-permission-role-by-id.query-handler';
import { IamFindPermissionRoleQueryHandler } from './application/find/iam-find-permission-role.query-handler';
import { IamGetPermissionsRolesQueryHandler } from './application/get/iam-get-permissions-roles.query-handler';
import { IamPaginatePermissionsRolesQueryHandler } from './application/paginate/iam-paginate-permissions-roles.query-handler';

// event handlers
import { IamCreatedPermissionRoleEventHandler } from './application/events/iam-created-permission-role.event-handler';
import { IamCreatedPermissionsRolesEventHandler } from './application/events/iam-created-permissions-roles.event-handler';
import { IamDeletedPermissionRoleEventHandler } from './application/events/iam-deleted-permission-role.event-handler';
import { IamDeletedPermissionsRolesEventHandler } from './application/events/iam-deleted-permissions-roles.event-handler';
import { IamUpdatedPermissionRoleEventHandler } from './application/events/iam-updated-permission-role.event-handler';
import { IamUpdatedPermissionsRolesEventHandler } from './application/events/iam-updated-permissions-roles.event-handler';

// services
import { IamCreatePermissionRoleService } from './application/create/iam-create-permission-role.service';
import { IamCreatePermissionsRolesService } from './application/create/iam-create-permissions-roles.service';
import { IamDeletePermissionRoleByIdService } from './application/delete/iam-delete-permission-role-by-id.service';
import { IamDeletePermissionsRolesService } from './application/delete/iam-delete-permissions-roles.service';
import { IamFindPermissionRoleByIdService } from './application/find/iam-find-permission-role-by-id.service';
import { IamFindPermissionRoleService } from './application/find/iam-find-permission-role.service';
import { IamGetPermissionsRolesService } from './application/get/iam-get-permissions-roles.service';
import { IamPaginatePermissionsRolesService } from './application/paginate/iam-paginate-permissions-roles.service';
import { IamUpdatePermissionRoleByIdService } from './application/update/iam-update-permission-role-by-id.service';
import { IamUpdatePermissionsRolesService } from './application/update/iam-update-permissions-roles.service';

export const IamPermissionRoleHandlers = [
    // commands
    IamCreatePermissionRoleCommandHandler,
    IamCreatePermissionsRolesCommandHandler,
    IamUpdatePermissionRoleByIdCommandHandler,
    IamUpdatePermissionsRolesCommandHandler,
    IamDeletePermissionRoleByIdCommandHandler,
    IamDeletePermissionsRolesCommandHandler,

    // queries
    IamPaginatePermissionsRolesQueryHandler,
    IamGetPermissionsRolesQueryHandler,
    IamFindPermissionRoleQueryHandler,
    IamFindPermissionRoleByIdQueryHandler,

    // events
    IamCreatedPermissionRoleEventHandler,
    IamCreatedPermissionsRolesEventHandler,
    IamUpdatedPermissionRoleEventHandler,
    IamUpdatedPermissionsRolesEventHandler,
    IamDeletedPermissionRoleEventHandler,
    IamDeletedPermissionsRolesEventHandler,
];

export const IamPermissionRoleServices = [
    IamCreatePermissionRoleService,
    IamCreatePermissionsRolesService,
    IamPaginatePermissionsRolesService,
    IamGetPermissionsRolesService,
    IamFindPermissionRoleService,
    IamFindPermissionRoleByIdService,
    IamUpdatePermissionRoleByIdService,
    IamUpdatePermissionsRolesService,
    IamDeletePermissionRoleByIdService,
    IamDeletePermissionsRolesService,
];
