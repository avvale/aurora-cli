// controllers
import { IamCreateTenantController } from './controllers/iam-create-tenant.controller';
import { IamCreateTenantsController } from './controllers/iam-create-tenants.controller';
import { IamPaginateTenantsController } from './controllers/iam-paginate-tenants.controller';
import { IamGetTenantsController } from './controllers/iam-get-tenants.controller';
import { IamFindTenantByIdController } from './controllers/iam-find-tenant-by-id.controller';
import { IamFindTenantController } from './controllers/iam-find-tenant.controller';
import { IamUpdateTenantController } from './controllers/iam-update-tenant.controller';
import { IamDeleteTenantByIdController } from './controllers/iam-delete-tenant-by-id.controller';
import { IamDeleteTenantsController } from './controllers/iam-delete-tenants.controller';

// resolvers
import { IamCreateTenantResolver } from './resolvers/iam-create-tenant.resolver';
import { IamCreateTenantsResolver } from './resolvers/iam-create-tenants.resolver';
import { IamPaginateTenantsResolver } from './resolvers/iam-paginate-tenants.resolver';
import { IamGetTenantsResolver } from './resolvers/iam-get-tenants.resolver';
import { IamFindTenantByIdResolver } from './resolvers/iam-find-tenant-by-id.resolver';
import { IamFindTenantResolver } from './resolvers/iam-find-tenant.resolver';
import { IamUpdateTenantResolver } from './resolvers/iam-update-tenant.resolver';
import { IamDeleteTenantByIdResolver } from './resolvers/iam-delete-tenant-by-id.resolver';
import { IamDeleteTenantsResolver } from './resolvers/iam-delete-tenants.resolver';

// handlers
import { IamCreateTenantHandler } from './handlers/iam-create-tenant.handler';
import { IamCreateTenantsHandler } from './handlers/iam-create-tenants.handler';
import { IamPaginateTenantsHandler } from './handlers/iam-paginate-tenants.handler';
import { IamGetTenantsHandler } from './handlers/iam-get-tenants.handler';
import { IamFindTenantByIdHandler } from './handlers/iam-find-tenant-by-id.handler';
import { IamFindTenantHandler } from './handlers/iam-find-tenant.handler';
import { IamUpdateTenantHandler } from './handlers/iam-update-tenant.handler';
import { IamDeleteTenantByIdHandler } from './handlers/iam-delete-tenant-by-id.handler';
import { IamDeleteTenantsHandler } from './handlers/iam-delete-tenants.handler';

export const IamTenantControllers = [
    IamCreateTenantController,
    IamCreateTenantsController,
    IamPaginateTenantsController,
    IamGetTenantsController,
    IamFindTenantByIdController,
    IamFindTenantController,
    IamUpdateTenantController,
    IamDeleteTenantByIdController,
    IamDeleteTenantsController,
];

export const IamTenantResolvers = [
    IamCreateTenantResolver,
    IamCreateTenantsResolver,
    IamPaginateTenantsResolver,
    IamGetTenantsResolver,
    IamFindTenantByIdResolver,
    IamFindTenantResolver,
    IamUpdateTenantResolver,
    IamDeleteTenantByIdResolver,
    IamDeleteTenantsResolver,
];

export const IamTenantApiHandlers = [
    IamCreateTenantHandler,
    IamCreateTenantsHandler,
    IamPaginateTenantsHandler,
    IamGetTenantsHandler,
    IamFindTenantByIdHandler,
    IamFindTenantHandler,
    IamUpdateTenantHandler,
    IamDeleteTenantByIdHandler,
    IamDeleteTenantsHandler,
];