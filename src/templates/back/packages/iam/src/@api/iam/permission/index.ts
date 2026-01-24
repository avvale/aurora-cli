/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
// export DTOs
export { IamCreatePermissionDto } from './dto/iam-create-permission.dto';
export { IamPermissionDto } from './dto/iam-permission.dto';
export { IamUpdatePermissionByIdDto } from './dto/iam-update-permission-by-id.dto';
export { IamUpdatePermissionsDto } from './dto/iam-update-permissions.dto';

// export handlers
export { IamCreatePermissionHandler } from './handlers/iam-create-permission.handler';
export { IamCreatePermissionsHandler } from './handlers/iam-create-permissions.handler';
export { IamDeletePermissionByIdHandler } from './handlers/iam-delete-permission-by-id.handler';
export { IamDeletePermissionsHandler } from './handlers/iam-delete-permissions.handler';
export { IamFindPermissionByIdHandler } from './handlers/iam-find-permission-by-id.handler';
export { IamFindPermissionHandler } from './handlers/iam-find-permission.handler';
export { IamGetPermissionsHandler } from './handlers/iam-get-permissions.handler';
export { IamPaginatePermissionsHandler } from './handlers/iam-paginate-permissions.handler';
export { IamUpdatePermissionByIdHandler } from './handlers/iam-update-permission-by-id.handler';
export { IamUpdatePermissionsHandler } from './handlers/iam-update-permissions.handler';

// export controllers
export { IamCreatePermissionController } from './controllers/iam-create-permission.controller';
export { IamCreatePermissionsController } from './controllers/iam-create-permissions.controller';
export { IamDeletePermissionByIdController } from './controllers/iam-delete-permission-by-id.controller';
export { IamDeletePermissionsController } from './controllers/iam-delete-permissions.controller';
export { IamFindPermissionByIdController } from './controllers/iam-find-permission-by-id.controller';
export { IamFindPermissionController } from './controllers/iam-find-permission.controller';
export { IamGetPermissionsController } from './controllers/iam-get-permissions.controller';
export { IamPaginatePermissionsController } from './controllers/iam-paginate-permissions.controller';
export { IamUpdatePermissionByIdController } from './controllers/iam-update-permission-by-id.controller';
export { IamUpdatePermissionsController } from './controllers/iam-update-permissions.controller';

// export resolvers
export { IamCreatePermissionResolver } from './resolvers/iam-create-permission.resolver';
export { IamCreatePermissionsResolver } from './resolvers/iam-create-permissions.resolver';
export { IamDeletePermissionByIdResolver } from './resolvers/iam-delete-permission-by-id.resolver';
export { IamDeletePermissionsResolver } from './resolvers/iam-delete-permissions.resolver';
export { IamFindPermissionByIdResolver } from './resolvers/iam-find-permission-by-id.resolver';
export { IamFindPermissionResolver } from './resolvers/iam-find-permission.resolver';
export { IamGetPermissionsResolver } from './resolvers/iam-get-permissions.resolver';
export { IamPaginatePermissionsResolver } from './resolvers/iam-paginate-permissions.resolver';
export { IamUpdatePermissionByIdResolver } from './resolvers/iam-update-permission-by-id.resolver';
export { IamUpdatePermissionsResolver } from './resolvers/iam-update-permissions.resolver';

// import controllers
import { IamCreatePermissionController } from './controllers/iam-create-permission.controller';
import { IamCreatePermissionsController } from './controllers/iam-create-permissions.controller';
import { IamDeletePermissionByIdController } from './controllers/iam-delete-permission-by-id.controller';
import { IamDeletePermissionsController } from './controllers/iam-delete-permissions.controller';
import { IamFindPermissionByIdController } from './controllers/iam-find-permission-by-id.controller';
import { IamFindPermissionController } from './controllers/iam-find-permission.controller';
import { IamGetPermissionsController } from './controllers/iam-get-permissions.controller';
import { IamPaginatePermissionsController } from './controllers/iam-paginate-permissions.controller';
import { IamUpdatePermissionByIdController } from './controllers/iam-update-permission-by-id.controller';
import { IamUpdatePermissionsController } from './controllers/iam-update-permissions.controller';

// import resolvers
import { IamCreatePermissionResolver } from './resolvers/iam-create-permission.resolver';
import { IamCreatePermissionsResolver } from './resolvers/iam-create-permissions.resolver';
import { IamDeletePermissionByIdResolver } from './resolvers/iam-delete-permission-by-id.resolver';
import { IamDeletePermissionsResolver } from './resolvers/iam-delete-permissions.resolver';
import { IamFindPermissionByIdResolver } from './resolvers/iam-find-permission-by-id.resolver';
import { IamFindPermissionResolver } from './resolvers/iam-find-permission.resolver';
import { IamGetPermissionsResolver } from './resolvers/iam-get-permissions.resolver';
import { IamPaginatePermissionsResolver } from './resolvers/iam-paginate-permissions.resolver';
import { IamUpdatePermissionByIdResolver } from './resolvers/iam-update-permission-by-id.resolver';
import { IamUpdatePermissionsResolver } from './resolvers/iam-update-permissions.resolver';

// import handlers
import { IamCreatePermissionHandler } from './handlers/iam-create-permission.handler';
import { IamCreatePermissionsHandler } from './handlers/iam-create-permissions.handler';
import { IamDeletePermissionByIdHandler } from './handlers/iam-delete-permission-by-id.handler';
import { IamDeletePermissionsHandler } from './handlers/iam-delete-permissions.handler';
import { IamFindPermissionByIdHandler } from './handlers/iam-find-permission-by-id.handler';
import { IamFindPermissionHandler } from './handlers/iam-find-permission.handler';
import { IamGetPermissionsHandler } from './handlers/iam-get-permissions.handler';
import { IamPaginatePermissionsHandler } from './handlers/iam-paginate-permissions.handler';
import { IamUpdatePermissionByIdHandler } from './handlers/iam-update-permission-by-id.handler';
import { IamUpdatePermissionsHandler } from './handlers/iam-update-permissions.handler';

// import seeder
import { IamPermissionSeeder } from './seeder/iam-permission.seeder';

export const IamPermissionApiControllers = [
  IamCreatePermissionController,
  IamCreatePermissionsController,
  IamPaginatePermissionsController,
  IamGetPermissionsController,
  IamFindPermissionByIdController,
  IamFindPermissionController,
  IamUpdatePermissionByIdController,
  IamUpdatePermissionsController,
  IamDeletePermissionByIdController,
  IamDeletePermissionsController,
];

export const IamPermissionApiResolvers = [
  IamCreatePermissionResolver,
  IamCreatePermissionsResolver,
  IamPaginatePermissionsResolver,
  IamGetPermissionsResolver,
  IamFindPermissionByIdResolver,
  IamFindPermissionResolver,
  IamUpdatePermissionByIdResolver,
  IamUpdatePermissionsResolver,
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
  IamUpdatePermissionByIdHandler,
  IamUpdatePermissionsHandler,
  IamDeletePermissionByIdHandler,
  IamDeletePermissionsHandler,
];

export const IamPermissionApiServices = [IamPermissionSeeder];
