// commands
import { CreatePermissionCommandHandler } from './application/create/create-permission.command-handler';
import { CreatePermissionsCommandHandler } from './application/create/create-permissions.command-handler';
import { UpdatePermissionCommandHandler } from './application/update/update-permission.command-handler';
import { DeletePermissionByIdCommandHandler } from './application/delete/delete-permission-by-id.command-handler';
import { DeletePermissionsCommandHandler } from './application/delete/delete-permissions.command-handler';

// queries
import { PaginatePermissionsQueryHandler } from './application/paginate/paginate-permissions.query-handler';
import { GetPermissionsQueryHandler } from './application/get/get-permissions.query-handler';
import { FindPermissionQueryHandler } from './application/find/find-permission.query-handler';
import { FindPermissionByIdQueryHandler } from './application/find/find-permission-by-id.query-handler';

// events
import { CreatedPermissionEventHandler } from './application/events/created-permission.event-handler';
import { CreatedPermissionsEventHandler } from './application/events/created-permissions.event-handler';
import { UpdatedPermissionEventHandler } from './application/events/updated-permission.event-handler';
import { DeletedPermissionEventHandler } from './application/events/deleted-permission.event-handler';
import { DeletedPermissionsEventHandler } from './application/events/deleted-permissions.event-handler';

// services
import { CreatePermissionService } from './application/create/create-permission.service';
import { CreatePermissionsService } from './application/create/create-permissions.service';
import { PaginatePermissionsService } from './application/paginate/paginate-permissions.service';
import { GetPermissionsService } from './application/get/get-permissions.service';
import { FindPermissionService } from './application/find/find-permission.service';
import { FindPermissionByIdService } from './application/find/find-permission-by-id.service';
import { UpdatePermissionService } from './application/update/update-permission.service';
import { DeletePermissionByIdService } from './application/delete/delete-permission-by-id.service';
import { DeletePermissionsService } from './application/delete/delete-permissions.service';

// models
export { IamPermissionModel } from './infrastructure/sequelize/sequelize-permission.model';
export { IamPermissionsRolesModel } from './infrastructure/sequelize/sequelize-permissions-roles.model';

// repository
export { IPermissionRepository } from './domain/permission.repository';
export { SequelizePermissionRepository } from './infrastructure/sequelize/sequelize-permission.repository';

// sagas
export { PermissionSagas } from './application/sagas/permission.sagas';

// ---- customizations ----
import { CreatePermissionsRolesCommandHandler } from './application/create/create-permissions-roles.command-handler';
import { CreatePermissionsRolesService } from './application/create/create-permissions-roles.service';
export { IPermissionRoleRepository } from './domain/permission-role.repository';
export { SequelizePermissionRoleRepository } from './infrastructure/sequelize/sequelize-permission-role.repository';

export const IamPermissionHandlers = [
    // commands
    CreatePermissionCommandHandler,
    CreatePermissionsCommandHandler,
    UpdatePermissionCommandHandler,
    DeletePermissionByIdCommandHandler,
    DeletePermissionsCommandHandler,

    // queries
    PaginatePermissionsQueryHandler,
    GetPermissionsQueryHandler,
    FindPermissionQueryHandler,
    FindPermissionByIdQueryHandler,

    // events
    CreatedPermissionEventHandler,
    CreatedPermissionsEventHandler,
    UpdatedPermissionEventHandler,
    DeletedPermissionEventHandler,
    DeletedPermissionsEventHandler,

    // ---- customizations ----
    CreatePermissionsRolesCommandHandler,
];

export const IamPermissionServices = [
    CreatePermissionService,
    CreatePermissionsService,
    PaginatePermissionsService,
    GetPermissionsService,
    FindPermissionService,
    FindPermissionByIdService,
    UpdatePermissionService,
    DeletePermissionByIdService,
    DeletePermissionsService,

    // ---- customizations ----
    CreatePermissionsRolesService,
];