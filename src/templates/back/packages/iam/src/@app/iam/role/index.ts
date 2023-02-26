// commands
import { CreateRoleCommandHandler } from './application/create/create-role.command-handler';
import { CreateRolesCommandHandler } from './application/create/create-roles.command-handler';
import { UpdateRoleByIdCommandHandler } from './application/update/update-role-by-id.command-handler';
import { UpdateRolesCommandHandler } from './application/update/update-roles.command-handler';
import { UpsertRoleCommandHandler } from './application/upsert/upsert-role.command-handler';
import { DeleteRoleByIdCommandHandler } from './application/delete/delete-role-by-id.command-handler';
import { DeleteRolesCommandHandler } from './application/delete/delete-roles.command-handler';

// queries
import { PaginateRolesQueryHandler } from './application/paginate/paginate-roles.query-handler';
import { GetRolesQueryHandler } from './application/get/get-roles.query-handler';
import { FindRoleQueryHandler } from './application/find/find-role.query-handler';
import { FindRoleByIdQueryHandler } from './application/find/find-role-by-id.query-handler';
import { RawSQLRolesQueryHandler } from './application/raw-sql/raw-sql-roles.query-handler';

// events
import { CreatedRoleEventHandler } from './application/events/created-role.event-handler';
import { CreatedRolesEventHandler } from './application/events/created-roles.event-handler';
import { UpdatedRoleEventHandler } from './application/events/updated-role.event-handler';
import { UpdatedRolesEventHandler } from './application/events/updated-roles.event-handler';
import { DeletedRoleEventHandler } from './application/events/deleted-role.event-handler';
import { DeletedRolesEventHandler } from './application/events/deleted-roles.event-handler';

// services
import { CreateRoleService } from './application/create/create-role.service';
import { CreateRolesService } from './application/create/create-roles.service';
import { PaginateRolesService } from './application/paginate/paginate-roles.service';
import { GetRolesService } from './application/get/get-roles.service';
import { FindRoleService } from './application/find/find-role.service';
import { FindRoleByIdService } from './application/find/find-role-by-id.service';
import { RawSQLRolesService } from './application/raw-sql/raw-sql-roles.service';
import { UpdateRoleByIdService } from './application/update/update-role-by-id.service';
import { UpdateRolesService } from './application/update/update-roles.service';
import { UpsertRoleService } from './application/upsert/upsert-role.service';
import { DeleteRoleByIdService } from './application/delete/delete-role-by-id.service';
import { DeleteRolesService } from './application/delete/delete-roles.service';

// models
export { IamRoleModel } from './infrastructure/sequelize/sequelize-role.model';
export { IamRolesAccountsModel } from './infrastructure/sequelize/sequelize-roles-accounts.model';

// repository
export { IRoleRepository } from './domain/role.repository';
export { SequelizeRoleRepository } from './infrastructure/sequelize/sequelize-role.repository';

// sagas
export { RoleSagas } from './application/sagas/role.sagas';

// ---- customizations ----
import { CreateRolesAccountsCommandHandler } from './application/create/create-roles-accounts.command-handler';
import { CreateRolesAccountsService } from './application/create/create-roles-accounts.service';
export { IRoleAccountRepository } from './domain/role-account.repository';
export { SequelizeRoleAccountRepository } from './infrastructure/sequelize/sequelize-role-account.repository';

export const IamRoleHandlers = [
    // commands
    CreateRoleCommandHandler,
    CreateRolesCommandHandler,
    UpdateRoleByIdCommandHandler,
    UpdateRolesCommandHandler,
    UpsertRoleCommandHandler,
    DeleteRoleByIdCommandHandler,
    DeleteRolesCommandHandler,

    // queries
    PaginateRolesQueryHandler,
    GetRolesQueryHandler,
    FindRoleQueryHandler,
    FindRoleByIdQueryHandler,
    RawSQLRolesQueryHandler,

    // events
    CreatedRoleEventHandler,
    CreatedRolesEventHandler,
    UpdatedRoleEventHandler,
    UpdatedRolesEventHandler,
    DeletedRoleEventHandler,
    DeletedRolesEventHandler,

    // ---- customizations ----
    CreateRolesAccountsCommandHandler,
    CreateRolesAccountsService,
];

export const IamRoleServices = [
    CreateRoleService,
    CreateRolesService,
    PaginateRolesService,
    GetRolesService,
    FindRoleService,
    FindRoleByIdService,
    RawSQLRolesService,
    UpdateRoleByIdService,
    UpdateRolesService,
    UpsertRoleService,
    DeleteRoleByIdService,
    DeleteRolesService,
];