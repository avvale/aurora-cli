// export commands
export { IamCreateRoleCommand } from './application/create/iam-create-role.command';
export { IamCreateRolesCommand } from './application/create/iam-create-roles.command';
export { IamUpdateRoleByIdCommand } from './application/update/iam-update-role-by-id.command';
export { IamUpdateRolesCommand } from './application/update/iam-update-roles.command';
export { IamDeleteRoleByIdCommand } from './application/delete/iam-delete-role-by-id.command';
export { IamDeleteRolesCommand } from './application/delete/iam-delete-roles.command';

// export queries
export { IamPaginateRolesQuery } from './application/paginate/iam-paginate-roles.query';
export { IamGetRolesQuery } from './application/get/iam-get-roles.query';
export { IamFindRoleQuery } from './application/find/iam-find-role.query';
export { IamFindRoleByIdQuery } from './application/find/iam-find-role-by-id.query';

// export mocks
export { iamMockRoleData } from './infrastructure/mock/iam-mock-role.data';
export { IamMockRoleSeeder } from './infrastructure/mock/iam-mock-role.seeder';
export { IamMockRoleRepository } from './infrastructure/mock/iam-mock-role.repository';

// export events
export { IamAddRolesContextEvent } from './application/events/iam-add-roles-context.event';
export { IamCreatedRolesEvent } from './application/events/iam-created-roles.event';
export { IamCreatedRoleEvent } from './application/events/iam-created-role.event';
export { IamDeletedRolesEvent } from './application/events/iam-deleted-roles.event';
export { IamDeletedRoleEvent } from './application/events/iam-deleted-role.event';
export { IamUpdatedRolesEvent } from './application/events/iam-updated-roles.event';
export { IamUpdatedRoleEvent } from './application/events/iam-updated-role.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { IamRole } from './domain/iam-role.aggregate';
export { IamRoleMapper } from './domain/iam-role.mapper';
export { IamIRoleRepository } from './domain/iam-role.repository';
export { IamRoleResponse } from './domain/iam-role.response';

// infrastructure
export { IamRoleModel } from './infrastructure/sequelize/iam-sequelize-role.model';
export { IamSequelizeRoleRepository } from './infrastructure/sequelize/iam-sequelize-role.repository';

// sagas
export { IamRoleSagas } from './application/sagas/iam-role.sagas';

// command handlers
import { IamCreateRoleCommandHandler } from './application/create/iam-create-role.command-handler';
import { IamCreateRolesCommandHandler } from './application/create/iam-create-roles.command-handler';
import { IamUpdateRoleByIdCommandHandler } from './application/update/iam-update-role-by-id.command-handler';
import { IamUpdateRolesCommandHandler } from './application/update/iam-update-roles.command-handler';
import { IamDeleteRoleByIdCommandHandler } from './application/delete/iam-delete-role-by-id.command-handler';
import { IamDeleteRolesCommandHandler } from './application/delete/iam-delete-roles.command-handler';

// query handlers
import { IamPaginateRolesQueryHandler } from './application/paginate/iam-paginate-roles.query-handler';
import { IamGetRolesQueryHandler } from './application/get/iam-get-roles.query-handler';
import { IamFindRoleQueryHandler } from './application/find/iam-find-role.query-handler';
import { IamFindRoleByIdQueryHandler } from './application/find/iam-find-role-by-id.query-handler';

// event handlers
import { IamCreatedRoleEventHandler } from './application/events/iam-created-role.event-handler';
import { IamCreatedRolesEventHandler } from './application/events/iam-created-roles.event-handler';
import { IamUpdatedRoleEventHandler } from './application/events/iam-updated-role.event-handler';
import { IamUpdatedRolesEventHandler } from './application/events/iam-updated-roles.event-handler';
import { IamDeletedRoleEventHandler } from './application/events/iam-deleted-role.event-handler';
import { IamDeletedRolesEventHandler } from './application/events/iam-deleted-roles.event-handler';

// services
import { IamCreateRoleService } from './application/create/iam-create-role.service';
import { IamCreateRolesService } from './application/create/iam-create-roles.service';
import { IamPaginateRolesService } from './application/paginate/iam-paginate-roles.service';
import { IamGetRolesService } from './application/get/iam-get-roles.service';
import { IamFindRoleService } from './application/find/iam-find-role.service';
import { IamFindRoleByIdService } from './application/find/iam-find-role-by-id.service';
import { IamUpdateRoleByIdService } from './application/update/iam-update-role-by-id.service';
import { IamUpdateRolesService } from './application/update/iam-update-roles.service';
import { IamDeleteRoleByIdService } from './application/delete/iam-delete-role-by-id.service';
import { IamDeleteRolesService } from './application/delete/iam-delete-roles.service';

export const IamRoleHandlers = [
    // commands
    IamCreateRoleCommandHandler,
    IamCreateRolesCommandHandler,
    IamUpdateRoleByIdCommandHandler,
    IamUpdateRolesCommandHandler,
    IamDeleteRoleByIdCommandHandler,
    IamDeleteRolesCommandHandler,

    // queries
    IamPaginateRolesQueryHandler,
    IamGetRolesQueryHandler,
    IamFindRoleQueryHandler,
    IamFindRoleByIdQueryHandler,

    // events
    IamCreatedRoleEventHandler,
    IamCreatedRolesEventHandler,
    IamUpdatedRoleEventHandler,
    IamUpdatedRolesEventHandler,
    IamDeletedRoleEventHandler,
    IamDeletedRolesEventHandler,
];

export const IamRoleServices = [
    IamCreateRoleService,
    IamCreateRolesService,
    IamPaginateRolesService,
    IamGetRolesService,
    IamFindRoleService,
    IamFindRoleByIdService,
    IamUpdateRoleByIdService,
    IamUpdateRolesService,
    IamDeleteRoleByIdService,
    IamDeleteRolesService,
];