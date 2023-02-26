// controllers
import { IamCreateTenantController } from './controllers/iam-create-tenant.controller';
import { IamCreateTenantsController } from './controllers/iam-create-tenants.controller';
import { IamPaginateTenantsController } from './controllers/iam-paginate-tenants.controller';
import { IamGetTenantsController } from './controllers/iam-get-tenants.controller';
import { IamFindTenantByIdController } from './controllers/iam-find-tenant-by-id.controller';
import { IamFindTenantController } from './controllers/iam-find-tenant.controller';
import { IamUpdateTenantByIdController } from './controllers/iam-update-tenant-by-id.controller';
import { IamUpdateTenantsController } from './controllers/iam-update-tenants.controller';
import { IamUpsertTenantController } from './controllers/iam-upsert-tenant.controller';
import { IamDeleteTenantByIdController } from './controllers/iam-delete-tenant-by-id.controller';
import { IamDeleteTenantsController } from './controllers/iam-delete-tenants.controller';

// resolvers
import { IamCreateTenantResolver } from './resolvers/iam-create-tenant.resolver';
import { IamCreateTenantsResolver } from './resolvers/iam-create-tenants.resolver';
import { IamPaginateTenantsResolver } from './resolvers/iam-paginate-tenants.resolver';
import { IamGetTenantsResolver } from './resolvers/iam-get-tenants.resolver';
import { IamFindTenantByIdResolver } from './resolvers/iam-find-tenant-by-id.resolver';
import { IamFindTenantResolver } from './resolvers/iam-find-tenant.resolver';
import { IamUpdateTenantByIdResolver } from './resolvers/iam-update-tenant-by-id.resolver';
import { IamUpdateTenantsResolver } from './resolvers/iam-update-tenants.resolver';
import { IamUpsertTenantResolver } from './resolvers/iam-upsert-tenant.resolver';
import { IamDeleteTenantByIdResolver } from './resolvers/iam-delete-tenant-by-id.resolver';
import { IamDeleteTenantsResolver } from './resolvers/iam-delete-tenants.resolver';

// handlers
import { IamCreateTenantHandler } from './handlers/iam-create-tenant.handler';
import { IamCreateTenantsHandler } from './handlers/iam-create-tenants.handler';
import { IamPaginateTenantsHandler } from './handlers/iam-paginate-tenants.handler';
import { IamGetTenantsHandler } from './handlers/iam-get-tenants.handler';
import { IamFindTenantByIdHandler } from './handlers/iam-find-tenant-by-id.handler';
import { IamFindTenantHandler } from './handlers/iam-find-tenant.handler';
import { IamUpdateTenantByIdHandler } from './handlers/iam-update-tenant-by-id.handler';
import { IamUpdateTenantsHandler } from './handlers/iam-update-tenants.handler';
import { IamUpsertTenantHandler } from './handlers/iam-upsert-tenant.handler';
import { IamDeleteTenantByIdHandler } from './handlers/iam-delete-tenant-by-id.handler';
import { IamDeleteTenantsHandler } from './handlers/iam-delete-tenants.handler';

// seeder
import { IamTenantSeeder } from './seeder/iam-tenant.seeder';

export const IamTenantControllers = [
    IamCreateTenantController,
    IamCreateTenantsController,
    IamPaginateTenantsController,
    IamGetTenantsController,
    IamFindTenantByIdController,
    IamFindTenantController,
    IamUpdateTenantByIdController,
    IamUpdateTenantsController,
    IamUpsertTenantController,
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
    IamUpdateTenantByIdResolver,
    IamUpdateTenantsResolver,
    IamUpsertTenantResolver,
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
    IamUpdateTenantByIdHandler,
    IamUpdateTenantsHandler,
    IamUpsertTenantHandler,
    IamDeleteTenantByIdHandler,
    IamDeleteTenantsHandler,
];

export const IamTenantServices = [
    IamTenantSeeder,
];