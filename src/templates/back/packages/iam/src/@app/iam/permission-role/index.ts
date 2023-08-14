// export commands
export { IamCreatePermissionRoleCommand } from './application/create/iam-create-permission-role.command';
export { IamCreatePermissionsRolesCommand } from './application/create/iam-create-permissions-roles.command';
export { IamDeletePermissionRoleByIdCommand } from './application/delete/iam-delete-permission-role-by-id.command';
export { IamDeletePermissionsRolesCommand } from './application/delete/iam-delete-permissions-roles.command';

// export queries
export { IamFindPermissionRoleByIdQuery } from './application/find/iam-find-permission-role-by-id.query';
export { IamFindPermissionRoleQuery } from './application/find/iam-find-permission-role.query';
export { IamGetPermissionsRolesQuery } from './application/get/iam-get-permissions-roles.query';
export { IamPaginatePermissionsRolesService } from './application/paginate/iam-paginate-permissions-roles.service';
export { IamPaginatePermissionsRolesQuery } from './application/paginate/iam-paginate-permissions-roles.query';

// export events
export { IamAddPermissionsRolesContextEvent } from './application/events/iam-add-permissions-roles-context.event';
export { IamCreatedPermissionRoleEvent } from './application/events/iam-created-permission-role.event';
export { IamCreatedPermissionsRolesEvent } from './application/events/iam-created-permissions-roles.event';
export { IamDeletedPermissionRoleEvent } from './application/events/iam-deleted-permission-role.event';
export { IamUpdatedPermissionRoleEvent } from './application/events/iam-updated-permission-role.event';

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
export { IamPermissionsRolesModel } from './infrastructure/sequelize/iam-sequelize-permissions-roles.model';
export { IamSequelizePermissionRoleRepository } from './infrastructure/sequelize/iam-sequelize-permission-role.repository';

// commands
import { IamCreatePermissionRoleCommandHandler } from './application/create/iam-create-permission-role.command-handler';
import { IamCreatePermissionsRolesCommandHandler } from './application/create/iam-create-permissions-roles.command-handler';
import { IamDeletePermissionRoleByIdCommandHandler } from './application/delete/iam-delete-permission-role-by-id.command-handler';
import { IamDeletePermissionsRolesCommandHandler } from './application/delete/iam-delete-permissions-roles.command-handler';

// query handlers
import { IamPaginatePermissionsRolesQueryHandler } from './application/paginate/iam-paginate-permissions-roles.query-handler';
import { IamGetPermissionsRolesQueryHandler } from './application/get/iam-get-permissions-roles.query-handler';
import { IamFindPermissionRoleQueryHandler } from './application/find/iam-find-permission-role.query-handler';
import { IamFindPermissionRoleByIdQueryHandler } from './application/find/iam-find-permission-role-by-id.query-handler';

// event handlers
/* import { CreatedPermissionRoleEventHandler } from './application/events/created-permission-role.event-handler';
import { CreatedPermissionsRolesEventHandler } from './application/events/created-permissions-roles.event-handler';
import { UpdatedPermissionRoleEventHandler } from './application/events/updated-permission.event-handler';
import { UpdatedPermissionsRolesEventHandler } from './application/events/updated-permissions.event-handler';
import { DeletedPermissionRoleEventHandler } from './application/events/deleted-permission.event-handler';
import { DeletedPermissionsRolesEventHandler } from './application/events/deleted-permissions.event-handler'; */

// services
import { IamCreatePermissionRoleService } from './application/create/iam-create-permission-role.service';
import { IamCreatePermissionsRolesService } from './application/create/iam-create-permissions-roles.service';
import { IamPaginatePermissionsRolesService } from './application/paginate/iam-paginate-permissions-roles.service';
import { IamGetPermissionsRolesService } from './application/get/iam-get-permissions-roles.service';
import { IamFindPermissionRoleService } from './application/find/iam-find-permission-role.service';
import { IamFindPermissionRoleByIdService } from './application/find/iam-find-permission-role-by-id.service';
import { IamDeletePermissionRoleByIdService } from './application/delete/iam-delete-permission-role-by-id.service';
import { IamDeletePermissionsRolesService } from './application/delete/iam-delete-permissions-roles.service';

export const IamPermissionRoleHandlers = [
    // commands
    IamCreatePermissionRoleCommandHandler,
    IamCreatePermissionsRolesCommandHandler,
    IamDeletePermissionRoleByIdCommandHandler,
    IamDeletePermissionsRolesCommandHandler,

    // queries
    IamPaginatePermissionsRolesQueryHandler,
    IamGetPermissionsRolesQueryHandler,
    IamFindPermissionRoleQueryHandler,
    IamFindPermissionRoleByIdQueryHandler,

    // events
];

export const IamPermissionRoleServices = [
    IamCreatePermissionRoleService,
    IamCreatePermissionsRolesService,
    IamPaginatePermissionsRolesService,
    IamGetPermissionsRolesService,
    IamFindPermissionRoleService,
    IamFindPermissionRoleByIdService,
    IamDeletePermissionRoleByIdService,
    IamDeletePermissionsRolesService,
];