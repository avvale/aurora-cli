// commands
import { CreateRoleCommandHandler } from './application/create/create-role.command-handler';
import { CreateRolesCommandHandler } from './application/create/create-roles.command-handler';
import { UpdateRoleCommandHandler } from './application/update/update-role.command-handler';
import { DeleteRoleByIdCommandHandler } from './application/delete/delete-role-by-id.command-handler';
import { DeleteRolesCommandHandler } from './application/delete/delete-roles.command-handler';

// queries
import { PaginateRolesQueryHandler } from './application/paginate/paginate-roles.query-handler';
import { GetRolesQueryHandler } from './application/get/get-roles.query-handler';
import { FindRoleQueryHandler } from './application/find/find-role.query-handler';
import { FindRoleByIdQueryHandler } from './application/find/find-role-by-id.query-handler';

// events
import { CreatedRoleEventHandler } from './application/events/created-role.event-handler';
import { CreatedRolesEventHandler } from './application/events/created-roles.event-handler';
import { UpdatedRoleEventHandler } from './application/events/updated-role.event-handler';
import { DeletedRoleEventHandler } from './application/events/deleted-role.event-handler';
import { DeletedRolesEventHandler } from './application/events/deleted-roles.event-handler';

// services
import { CreateRoleService } from './application/create/create-role.service';
import { CreateRolesService } from './application/create/create-roles.service';
import { PaginateRolesService } from './application/paginate/paginate-roles.service';
import { GetRolesService } from './application/get/get-roles.service';
import { FindRoleService } from './application/find/find-role.service';
import { FindRoleByIdService } from './application/find/find-role-by-id.service';
import { UpdateRoleService } from './application/update/update-role.service';
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
    UpdateRoleCommandHandler,
    DeleteRoleByIdCommandHandler,
    DeleteRolesCommandHandler,

    // queries
    PaginateRolesQueryHandler,
    GetRolesQueryHandler,
    FindRoleQueryHandler,
    FindRoleByIdQueryHandler,

    // events
    CreatedRoleEventHandler,
    CreatedRolesEventHandler,
    UpdatedRoleEventHandler,
    DeletedRoleEventHandler,
    DeletedRolesEventHandler,

    // custom
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
    UpdateRoleService,
    DeleteRoleByIdService,
    DeleteRolesService,
];