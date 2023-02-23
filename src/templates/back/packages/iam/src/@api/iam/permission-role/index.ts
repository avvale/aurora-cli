// controllers
import { IamCreatePermissionRoleController } from './controllers/iam-create-permission-role.controller';
import { IamCreatePermissionsRolesController } from './controllers/iam-create-permissions-roles.controller';
import { IamPaginatePermissionsRolesController } from './controllers/iam-paginate-permissions-roles.controller';
import { IamGetPermissionsRolesController } from './controllers/iam-get-permissions-roles.controller';
import { IamDeletePermissionRoleByIdController } from './controllers/iam-delete-permission-role-by-id.controller';
import { IamDeletePermissionsRolesController } from './controllers/iam-delete-permissions-roles.controller';

// resolvers
import { IamCreatePermissionRoleResolver } from './resolvers/iam-create-permission-role.resolver';
import { IamCreatePermissionsRolesResolver } from './resolvers/iam-create-permissions-roles.resolver';
import { IamPaginatePermissionsRolesResolver } from './resolvers/iam-paginate-permissions-roles.resolver';
import { IamGetPermissionsRolesResolver } from './resolvers/iam-get-permissions-roles.resolver';
import { IamDeletePermissionRoleByIdResolver } from './resolvers/iam-delete-permission-role-by-id.resolver';
import { IamDeletePermissionsRolesResolver } from './resolvers/iam-delete-permissions-roles.resolver';

// handlers
import { IamCreatePermissionRoleHandler } from './handlers/iam-create-permission-role.handler';
import { IamCreatePermissionsRolesHandler } from './handlers/iam-create-permissions-roles.handler';
import { IamPaginatePermissionsRolesHandler } from './handlers/iam-paginate-permissions-roles.handler';
import { IamGetPermissionsRolesHandler } from './handlers/iam-get-permissions-roles.handler';
import { IamDeletePermissionRoleByIdHandler } from './handlers/iam-delete-permission-role-by-id.handler';
import { IamDeletePermissionsRolesHandler } from './handlers/iam-delete-permissions-roles.handler';

export const IamPermissionRoleControllers = [
    IamCreatePermissionRoleController,
    IamCreatePermissionsRolesController,
    IamPaginatePermissionsRolesController,
    IamGetPermissionsRolesController,
    IamDeletePermissionRoleByIdController,
    IamDeletePermissionsRolesController,
];

export const IamPermissionRoleResolvers = [
    IamCreatePermissionRoleResolver,
    IamCreatePermissionsRolesResolver,
    IamPaginatePermissionsRolesResolver,
    IamGetPermissionsRolesResolver,
    IamDeletePermissionRoleByIdResolver,
    IamDeletePermissionsRolesResolver,
];

export const IamPermissionRoleApiHandlers = [
    IamCreatePermissionRoleHandler,
    IamCreatePermissionsRolesHandler,
    IamPaginatePermissionsRolesHandler,
    IamGetPermissionsRolesHandler,
    IamDeletePermissionRoleByIdHandler,
    IamDeletePermissionsRolesHandler,
];