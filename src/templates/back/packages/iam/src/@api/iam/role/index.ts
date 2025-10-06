// export DTOs
export { IamRoleDto } from './dto/iam-role.dto';
export { IamCreateRoleDto } from './dto/iam-create-role.dto';
export { IamUpdateRoleByIdDto } from './dto/iam-update-role-by-id.dto';
export { IamUpdateRolesDto } from './dto/iam-update-roles.dto';

// export handlers
export { IamCreateRoleHandler } from './handlers/iam-create-role.handler';
export { IamCreateRolesHandler } from './handlers/iam-create-roles.handler';
export { IamPaginateRolesHandler } from './handlers/iam-paginate-roles.handler';
export { IamGetRolesHandler } from './handlers/iam-get-roles.handler';
export { IamFindRoleByIdHandler } from './handlers/iam-find-role-by-id.handler';
export { IamFindRoleHandler } from './handlers/iam-find-role.handler';
export { IamUpdateRoleByIdHandler } from './handlers/iam-update-role-by-id.handler';
export { IamUpdateRolesHandler } from './handlers/iam-update-roles.handler';
export { IamDeleteRoleByIdHandler } from './handlers/iam-delete-role-by-id.handler';
export { IamDeleteRolesHandler } from './handlers/iam-delete-roles.handler';

// export controllers
export { IamCreateRoleController } from './controllers/iam-create-role.controller';
export { IamCreateRolesController } from './controllers/iam-create-roles.controller';
export { IamPaginateRolesController } from './controllers/iam-paginate-roles.controller';
export { IamGetRolesController } from './controllers/iam-get-roles.controller';
export { IamFindRoleByIdController } from './controllers/iam-find-role-by-id.controller';
export { IamFindRoleController } from './controllers/iam-find-role.controller';
export { IamUpdateRoleByIdController } from './controllers/iam-update-role-by-id.controller';
export { IamUpdateRolesController } from './controllers/iam-update-roles.controller';
export { IamDeleteRoleByIdController } from './controllers/iam-delete-role-by-id.controller';
export { IamDeleteRolesController } from './controllers/iam-delete-roles.controller';

// export resolvers
export { IamCreateRoleResolver } from './resolvers/iam-create-role.resolver';
export { IamCreateRolesResolver } from './resolvers/iam-create-roles.resolver';
export { IamPaginateRolesResolver } from './resolvers/iam-paginate-roles.resolver';
export { IamGetRolesResolver } from './resolvers/iam-get-roles.resolver';
export { IamFindRoleByIdResolver } from './resolvers/iam-find-role-by-id.resolver';
export { IamFindRoleResolver } from './resolvers/iam-find-role.resolver';
export { IamUpdateRoleByIdResolver } from './resolvers/iam-update-role-by-id.resolver';
export { IamUpdateRolesResolver } from './resolvers/iam-update-roles.resolver';
export { IamDeleteRoleByIdResolver } from './resolvers/iam-delete-role-by-id.resolver';
export { IamDeleteRolesResolver } from './resolvers/iam-delete-roles.resolver';

// export additionalApis
export { IamInheritPermissionsRoleRoleController } from './controllers/iam-inherit-permissions-role-role.controller';
export { IamInheritPermissionsRoleRoleHandler } from './handlers/iam-inherit-permissions-role-role.handler';
export { IamInheritPermissionsRoleRoleResolver } from './resolvers/iam-inherit-permissions-role-role.resolver';

// import controllers
import { IamCreateRoleController } from './controllers/iam-create-role.controller';
import { IamCreateRolesController } from './controllers/iam-create-roles.controller';
import { IamPaginateRolesController } from './controllers/iam-paginate-roles.controller';
import { IamGetRolesController } from './controllers/iam-get-roles.controller';
import { IamFindRoleByIdController } from './controllers/iam-find-role-by-id.controller';
import { IamFindRoleController } from './controllers/iam-find-role.controller';
import { IamUpdateRoleByIdController } from './controllers/iam-update-role-by-id.controller';
import { IamUpdateRolesController } from './controllers/iam-update-roles.controller';
import { IamDeleteRoleByIdController } from './controllers/iam-delete-role-by-id.controller';
import { IamDeleteRolesController } from './controllers/iam-delete-roles.controller';

// import resolvers
import { IamCreateRoleResolver } from './resolvers/iam-create-role.resolver';
import { IamCreateRolesResolver } from './resolvers/iam-create-roles.resolver';
import { IamPaginateRolesResolver } from './resolvers/iam-paginate-roles.resolver';
import { IamGetRolesResolver } from './resolvers/iam-get-roles.resolver';
import { IamFindRoleByIdResolver } from './resolvers/iam-find-role-by-id.resolver';
import { IamFindRoleResolver } from './resolvers/iam-find-role.resolver';
import { IamUpdateRoleByIdResolver } from './resolvers/iam-update-role-by-id.resolver';
import { IamUpdateRolesResolver } from './resolvers/iam-update-roles.resolver';
import { IamDeleteRoleByIdResolver } from './resolvers/iam-delete-role-by-id.resolver';
import { IamDeleteRolesResolver } from './resolvers/iam-delete-roles.resolver';

// import handlers
import { IamCreateRoleHandler } from './handlers/iam-create-role.handler';
import { IamCreateRolesHandler } from './handlers/iam-create-roles.handler';
import { IamPaginateRolesHandler } from './handlers/iam-paginate-roles.handler';
import { IamGetRolesHandler } from './handlers/iam-get-roles.handler';
import { IamFindRoleByIdHandler } from './handlers/iam-find-role-by-id.handler';
import { IamFindRoleHandler } from './handlers/iam-find-role.handler';
import { IamUpdateRoleByIdHandler } from './handlers/iam-update-role-by-id.handler';
import { IamUpdateRolesHandler } from './handlers/iam-update-roles.handler';
import { IamDeleteRoleByIdHandler } from './handlers/iam-delete-role-by-id.handler';
import { IamDeleteRolesHandler } from './handlers/iam-delete-roles.handler';

// import seeder
import { IamRoleSeeder } from './seeder/iam-role.seeder';

// import additionalApis
import { IamInheritPermissionsRoleRoleController } from './controllers/iam-inherit-permissions-role-role.controller';
import { IamInheritPermissionsRoleRoleHandler } from './handlers/iam-inherit-permissions-role-role.handler';
import { IamInheritPermissionsRoleRoleResolver } from './resolvers/iam-inherit-permissions-role-role.resolver';

export const IamRoleApiControllers = [
    IamCreateRoleController,
    IamCreateRolesController,
    IamPaginateRolesController,
    IamGetRolesController,
    IamFindRoleByIdController,
    IamFindRoleController,
    IamUpdateRoleByIdController,
    IamUpdateRolesController,
    IamDeleteRoleByIdController,
    IamDeleteRolesController,

    // additionalApis
    IamInheritPermissionsRoleRoleController,
];

export const IamRoleApiResolvers = [
    IamCreateRoleResolver,
    IamCreateRolesResolver,
    IamPaginateRolesResolver,
    IamGetRolesResolver,
    IamFindRoleByIdResolver,
    IamFindRoleResolver,
    IamUpdateRoleByIdResolver,
    IamUpdateRolesResolver,
    IamDeleteRoleByIdResolver,
    IamDeleteRolesResolver,

    // additionalApis
    IamInheritPermissionsRoleRoleResolver,
];

export const IamRoleApiHandlers = [
    IamCreateRoleHandler,
    IamCreateRolesHandler,
    IamPaginateRolesHandler,
    IamGetRolesHandler,
    IamFindRoleByIdHandler,
    IamFindRoleHandler,
    IamUpdateRoleByIdHandler,
    IamUpdateRolesHandler,
    IamDeleteRoleByIdHandler,
    IamDeleteRolesHandler,

    // additionalApis
    IamInheritPermissionsRoleRoleHandler,
];

export const IamRoleApiServices = [
    IamRoleSeeder,
];
