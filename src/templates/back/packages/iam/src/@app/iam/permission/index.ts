// commands
import { CreatePermissionCommandHandler } from './application/create/create-permission.command-handler';
import { CreatePermissionsCommandHandler } from './application/create/create-permissions.command-handler';
import { UpdatePermissionByIdCommandHandler } from './application/update/update-permission-by-id.command-handler';
import { UpdatePermissionsCommandHandler } from './application/update/update-permissions.command-handler';
import { UpsertPermissionCommandHandler } from './application/upsert/upsert-permission.command-handler';
import { DeletePermissionByIdCommandHandler } from './application/delete/delete-permission-by-id.command-handler';
import { DeletePermissionsCommandHandler } from './application/delete/delete-permissions.command-handler';

// queries
import { PaginatePermissionsQueryHandler } from './application/paginate/paginate-permissions.query-handler';
import { GetPermissionsQueryHandler } from './application/get/get-permissions.query-handler';
import { FindPermissionQueryHandler } from './application/find/find-permission.query-handler';
import { FindPermissionByIdQueryHandler } from './application/find/find-permission-by-id.query-handler';
import { RawSQLPermissionsQueryHandler } from './application/raw-sql/raw-sql-permissions.query-handler';

// events
import { CreatedPermissionEventHandler } from './application/events/created-permission.event-handler';
import { CreatedPermissionsEventHandler } from './application/events/created-permissions.event-handler';
import { UpdatedPermissionEventHandler } from './application/events/updated-permission.event-handler';
import { UpdatedPermissionsEventHandler } from './application/events/updated-permissions.event-handler';
import { DeletedPermissionEventHandler } from './application/events/deleted-permission.event-handler';
import { DeletedPermissionsEventHandler } from './application/events/deleted-permissions.event-handler';

// services
import { CreatePermissionService } from './application/create/create-permission.service';
import { CreatePermissionsService } from './application/create/create-permissions.service';
import { PaginatePermissionsService } from './application/paginate/paginate-permissions.service';
import { GetPermissionsService } from './application/get/get-permissions.service';
import { FindPermissionService } from './application/find/find-permission.service';
import { FindPermissionByIdService } from './application/find/find-permission-by-id.service';
import { RawSQLPermissionsService } from './application/raw-sql/raw-sql-permissions.service';
import { UpdatePermissionByIdService } from './application/update/update-permission-by-id.service';
import { UpdatePermissionsService } from './application/update/update-permissions.service';
import { UpsertPermissionService } from './application/upsert/upsert-permission.service';
import { DeletePermissionByIdService } from './application/delete/delete-permission-by-id.service';
import { DeletePermissionsService } from './application/delete/delete-permissions.service';

// models
export { IamPermissionModel } from './infrastructure/sequelize/sequelize-permission.model';

// repository
export { IPermissionRepository } from './domain/permission.repository';
export { SequelizePermissionRepository } from './infrastructure/sequelize/sequelize-permission.repository';

// sagas
export { PermissionSagas } from './application/sagas/permission.sagas';

export const IamPermissionHandlers = [
    // commands
    CreatePermissionCommandHandler,
    CreatePermissionsCommandHandler,
    UpdatePermissionByIdCommandHandler,
    UpdatePermissionsCommandHandler,
    UpsertPermissionCommandHandler,
    DeletePermissionByIdCommandHandler,
    DeletePermissionsCommandHandler,

    // queries
    PaginatePermissionsQueryHandler,
    GetPermissionsQueryHandler,
    FindPermissionQueryHandler,
    FindPermissionByIdQueryHandler,
    RawSQLPermissionsQueryHandler,

    // events
    CreatedPermissionEventHandler,
    CreatedPermissionsEventHandler,
    UpdatedPermissionEventHandler,
    UpdatedPermissionsEventHandler,
    DeletedPermissionEventHandler,
    DeletedPermissionsEventHandler,
];

export const IamPermissionServices = [
    CreatePermissionService,
    CreatePermissionsService,
    PaginatePermissionsService,
    GetPermissionsService,
    FindPermissionService,
    FindPermissionByIdService,
    RawSQLPermissionsService,
    UpdatePermissionByIdService,
    UpdatePermissionsService,
    UpsertPermissionService,
    DeletePermissionByIdService,
    DeletePermissionsService,
];