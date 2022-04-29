// controllers
import { IamCreatePermissionController } from './controllers/iam-create-permission.controller';
import { IamCreatePermissionsController } from './controllers/iam-create-permissions.controller';
import { IamPaginatePermissionsController } from './controllers/iam-paginate-permissions.controller';
import { IamGetPermissionsController } from './controllers/iam-get-permissions.controller';
import { IamFindPermissionByIdController } from './controllers/iam-find-permission-by-id.controller';
import { IamFindPermissionController } from './controllers/iam-find-permission.controller';
import { IamUpdatePermissionController } from './controllers/iam-update-permission.controller';
import { IamDeletePermissionByIdController } from './controllers/iam-delete-permission-by-id.controller';
import { IamDeletePermissionsController } from './controllers/iam-delete-permissions.controller';

// resolvers
import { IamCreatePermissionResolver } from './resolvers/iam-create-permission.resolver';
import { IamCreatePermissionsResolver } from './resolvers/iam-create-permissions.resolver';
import { IamPaginatePermissionsResolver } from './resolvers/iam-paginate-permissions.resolver';
import { IamGetPermissionsResolver } from './resolvers/iam-get-permissions.resolver';
import { IamFindPermissionByIdResolver } from './resolvers/iam-find-permission-by-id.resolver';
import { IamFindPermissionResolver } from './resolvers/iam-find-permission.resolver';
import { IamUpdatePermissionResolver } from './resolvers/iam-update-permission.resolver';
import { IamDeletePermissionByIdResolver } from './resolvers/iam-delete-permission-by-id.resolver';
import { IamDeletePermissionsResolver } from './resolvers/iam-delete-permissions.resolver';

// handlers
import { IamCreatePermissionHandler } from './handlers/iam-create-permission.handler';
import { IamCreatePermissionsHandler } from './handlers/iam-create-permissions.handler';
import { IamPaginatePermissionsHandler } from './handlers/iam-paginate-permissions.handler';
import { IamGetPermissionsHandler } from './handlers/iam-get-permissions.handler';
import { IamFindPermissionByIdHandler } from './handlers/iam-find-permission-by-id.handler';
import { IamFindPermissionHandler } from './handlers/iam-find-permission.handler';
import { IamUpdatePermissionHandler } from './handlers/iam-update-permission.handler';
import { IamDeletePermissionByIdHandler } from './handlers/iam-delete-permission-by-id.handler';
import { IamDeletePermissionsHandler } from './handlers/iam-delete-permissions.handler';

export const IamPermissionControllers = [
    IamCreatePermissionController,
    IamCreatePermissionsController,
    IamPaginatePermissionsController,
    IamGetPermissionsController,
    IamFindPermissionByIdController,
    IamFindPermissionController,
    IamUpdatePermissionController,
    IamDeletePermissionByIdController,
    IamDeletePermissionsController,
];

export const IamPermissionResolvers = [
    IamCreatePermissionResolver,
    IamCreatePermissionsResolver,
    IamPaginatePermissionsResolver,
    IamGetPermissionsResolver,
    IamFindPermissionByIdResolver,
    IamFindPermissionResolver,
    IamUpdatePermissionResolver,
    IamDeletePermissionByIdResolver,
    IamDeletePermissionsResolver,
];

export const IamPermissionApiHandlers = [
    IamCreatePermissionHandler,
    IamCreatePermissionsHandler,
    IamPaginatePermissionsHandler,
    IamGetPermissionsHandler,
    IamFindPermissionByIdHandler,
    IamFindPermissionHandler,
    IamUpdatePermissionHandler,
    IamDeletePermissionByIdHandler,
    IamDeletePermissionsHandler,
];