// controllers
import { IamCreateRoleController } from './controllers/iam-create-role.controller';
import { IamCreateRolesController } from './controllers/iam-create-roles.controller';
import { IamPaginateRolesController } from './controllers/iam-paginate-roles.controller';
import { IamGetRolesController } from './controllers/iam-get-roles.controller';
import { IamFindRoleByIdController } from './controllers/iam-find-role-by-id.controller';
import { IamFindRoleController } from './controllers/iam-find-role.controller';
import { IamUpdateRoleController } from './controllers/iam-update-role.controller';
import { IamDeleteRoleByIdController } from './controllers/iam-delete-role-by-id.controller';
import { IamDeleteRolesController } from './controllers/iam-delete-roles.controller';

// resolvers
import { IamCreateRoleResolver } from './resolvers/iam-create-role.resolver';
import { IamCreateRolesResolver } from './resolvers/iam-create-roles.resolver';
import { IamPaginateRolesResolver } from './resolvers/iam-paginate-roles.resolver';
import { IamGetRolesResolver } from './resolvers/iam-get-roles.resolver';
import { IamFindRoleByIdResolver } from './resolvers/iam-find-role-by-id.resolver';
import { IamFindRoleResolver } from './resolvers/iam-find-role.resolver';
import { IamUpdateRoleResolver } from './resolvers/iam-update-role.resolver';
import { IamDeleteRoleByIdResolver } from './resolvers/iam-delete-role-by-id.resolver';
import { IamDeleteRolesResolver } from './resolvers/iam-delete-roles.resolver';

// handlers
import { IamCreateRoleHandler } from './handlers/iam-create-role.handler';
import { IamCreateRolesHandler } from './handlers/iam-create-roles.handler';
import { IamPaginateRolesHandler } from './handlers/iam-paginate-roles.handler';
import { IamGetRolesHandler } from './handlers/iam-get-roles.handler';
import { IamFindRoleByIdHandler } from './handlers/iam-find-role-by-id.handler';
import { IamFindRoleHandler } from './handlers/iam-find-role.handler';
import { IamUpdateRoleHandler } from './handlers/iam-update-role.handler';
import { IamDeleteRoleByIdHandler } from './handlers/iam-delete-role-by-id.handler';
import { IamDeleteRolesHandler } from './handlers/iam-delete-roles.handler';

export const IamRoleControllers = [
    IamCreateRoleController,
    IamCreateRolesController,
    IamPaginateRolesController,
    IamGetRolesController,
    IamFindRoleByIdController,
    IamFindRoleController,
    IamUpdateRoleController,
    IamDeleteRoleByIdController,
    IamDeleteRolesController,
];

export const IamRoleResolvers = [
    IamCreateRoleResolver,
    IamCreateRolesResolver,
    IamPaginateRolesResolver,
    IamGetRolesResolver,
    IamFindRoleByIdResolver,
    IamFindRoleResolver,
    IamUpdateRoleResolver,
    IamDeleteRoleByIdResolver,
    IamDeleteRolesResolver,
];

export const IamRoleApiHandlers = [
    IamCreateRoleHandler,
    IamCreateRolesHandler,
    IamPaginateRolesHandler,
    IamGetRolesHandler,
    IamFindRoleByIdHandler,
    IamFindRoleHandler,
    IamUpdateRoleHandler,
    IamDeleteRoleByIdHandler,
    IamDeleteRolesHandler,
];