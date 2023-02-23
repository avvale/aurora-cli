// commands
import { CreatePermissionRoleCommandHandler } from './application/create/create-permission-role.command-handler';
import { CreatePermissionsRolesCommandHandler } from './application/create/create-permissions-roles.command-handler';
import { DeletePermissionRoleByIdCommandHandler } from './application/delete/delete-permission-role-by-id.command-handler';
import { DeletePermissionsRolesCommandHandler } from './application/delete/delete-permissions-roles.command-handler';

// queries
import { PaginatePermissionsRolesQueryHandler } from './application/paginate/paginate-permissions-roles.query-handler';
import { GetPermissionsRolesQueryHandler } from './application/get/get-permissions-roles.query-handler';
import { FindPermissionRoleQueryHandler } from './application/find/find-permission-role.query-handler';
import { FindPermissionRoleByIdQueryHandler } from './application/find/find-permission-role-by-id.query-handler';

// events
/* import { CreatedPermissionRoleEventHandler } from './application/events/created-permission-role.event-handler';
import { CreatedPermissionsRolesEventHandler } from './application/events/created-permissions-roles.event-handler';
import { UpdatedPermissionRoleEventHandler } from './application/events/updated-permission.event-handler';
import { UpdatedPermissionsRolesEventHandler } from './application/events/updated-permissions.event-handler';
import { DeletedPermissionRoleEventHandler } from './application/events/deleted-permission.event-handler';
import { DeletedPermissionsRolesEventHandler } from './application/events/deleted-permissions.event-handler'; */

// services
import { CreatePermissionRoleService } from './application/create/create-permission-role.service';
import { CreatePermissionsRolesService } from './application/create/create-permissions-roles.service';
import { PaginatePermissionsRolesService } from './application/paginate/paginate-permissions-roles.service';
import { GetPermissionsRolesService } from './application/get/get-permissions-roles.service';
import { FindPermissionRoleService } from './application/find/find-permission-role.service';
import { FindPermissionRoleByIdService } from './application/find/find-permission-role-by-id.service';
import { DeletePermissionRoleByIdService } from './application/delete/delete-permission-role-by-id.service';
import { DeletePermissionsRolesService } from './application/delete/delete-permissions-roles.service';

// models
export { IamPermissionsRolesModel } from './infrastructure/sequelize/sequelize-permissions-roles.model';

// repository
export { IPermissionRoleRepository } from './domain/permission-role.repository';
export { SequelizePermissionRoleRepository } from './infrastructure/sequelize/sequelize-permission-role.repository';

// sagas

export const IamPermissionRoleHandlers = [
    // commands
    CreatePermissionRoleCommandHandler,
    CreatePermissionsRolesCommandHandler,
    DeletePermissionRoleByIdCommandHandler,
    DeletePermissionsRolesCommandHandler,

    // queries
    PaginatePermissionsRolesQueryHandler,
    GetPermissionsRolesQueryHandler,
    FindPermissionRoleQueryHandler,
    FindPermissionRoleByIdQueryHandler,

    // events
];

export const IamPermissionRoleServices = [
    CreatePermissionRoleService,
    CreatePermissionsRolesService,
    PaginatePermissionsRolesService,
    GetPermissionsRolesService,
    FindPermissionRoleService,
    FindPermissionRoleByIdService,
    DeletePermissionRoleByIdService,
    DeletePermissionsRolesService,
];