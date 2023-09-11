// export DTOs
export { IamTenantAccountDto } from './dto/iam-tenant-account.dto';
export { IamCreateTenantAccountDto } from './dto/iam-create-tenant-account.dto';
export { IamUpdateTenantAccountByIdDto } from './dto/iam-update-tenant-account-by-id.dto';
export { IamUpdateTenantsAccountsDto } from './dto/iam-update-tenants-accounts.dto';

// export handlers
export { IamCreateTenantAccountHandler } from './handlers/iam-create-tenant-account.handler';
export { IamCreateTenantsAccountsHandler } from './handlers/iam-create-tenants-accounts.handler';
export { IamPaginateTenantsAccountsHandler } from './handlers/iam-paginate-tenants-accounts.handler';
export { IamGetTenantsAccountsHandler } from './handlers/iam-get-tenants-accounts.handler';
export { IamFindTenantAccountByIdHandler } from './handlers/iam-find-tenant-account-by-id.handler';
export { IamFindTenantAccountHandler } from './handlers/iam-find-tenant-account.handler';
export { IamUpdateTenantAccountByIdHandler } from './handlers/iam-update-tenant-account-by-id.handler';
export { IamUpdateTenantsAccountsHandler } from './handlers/iam-update-tenants-accounts.handler';
export { IamUpsertTenantAccountHandler } from './handlers/iam-upsert-tenant-account.handler';
export { IamDeleteTenantAccountByIdHandler } from './handlers/iam-delete-tenant-account-by-id.handler';
export { IamDeleteTenantsAccountsHandler } from './handlers/iam-delete-tenants-accounts.handler';

// export controllers
export { IamCreateTenantAccountController } from './controllers/iam-create-tenant-account.controller';
export { IamCreateTenantsAccountsController } from './controllers/iam-create-tenants-accounts.controller';
export { IamPaginateTenantsAccountsController } from './controllers/iam-paginate-tenants-accounts.controller';
export { IamGetTenantsAccountsController } from './controllers/iam-get-tenants-accounts.controller';
export { IamFindTenantAccountByIdController } from './controllers/iam-find-tenant-account-by-id.controller';
export { IamFindTenantAccountController } from './controllers/iam-find-tenant-account.controller';
export { IamUpdateTenantAccountByIdController } from './controllers/iam-update-tenant-account-by-id.controller';
export { IamUpdateTenantsAccountsController } from './controllers/iam-update-tenants-accounts.controller';
export { IamUpsertTenantAccountController } from './controllers/iam-upsert-tenant-account.controller';
export { IamDeleteTenantAccountByIdController } from './controllers/iam-delete-tenant-account-by-id.controller';
export { IamDeleteTenantsAccountsController } from './controllers/iam-delete-tenants-accounts.controller';

// exports resolvers
export { IamCreateTenantAccountResolver } from './resolvers/iam-create-tenant-account.resolver';
export { IamCreateTenantsAccountsResolver } from './resolvers/iam-create-tenants-accounts.resolver';
export { IamPaginateTenantsAccountsResolver } from './resolvers/iam-paginate-tenants-accounts.resolver';
export { IamGetTenantsAccountsResolver } from './resolvers/iam-get-tenants-accounts.resolver';
export { IamFindTenantAccountByIdResolver } from './resolvers/iam-find-tenant-account-by-id.resolver';
export { IamFindTenantAccountResolver } from './resolvers/iam-find-tenant-account.resolver';
export { IamUpdateTenantAccountByIdResolver } from './resolvers/iam-update-tenant-account-by-id.resolver';
export { IamUpdateTenantsAccountsResolver } from './resolvers/iam-update-tenants-accounts.resolver';
export { IamUpsertTenantAccountResolver } from './resolvers/iam-upsert-tenant-account.resolver';
export { IamDeleteTenantAccountByIdResolver } from './resolvers/iam-delete-tenant-account-by-id.resolver';
export { IamDeleteTenantsAccountsResolver } from './resolvers/iam-delete-tenants-accounts.resolver';

// controllers
import { IamCreateTenantAccountController } from './controllers/iam-create-tenant-account.controller';
import { IamCreateTenantsAccountsController } from './controllers/iam-create-tenants-accounts.controller';
import { IamPaginateTenantsAccountsController } from './controllers/iam-paginate-tenants-accounts.controller';
import { IamGetTenantsAccountsController } from './controllers/iam-get-tenants-accounts.controller';
import { IamFindTenantAccountByIdController } from './controllers/iam-find-tenant-account-by-id.controller';
import { IamFindTenantAccountController } from './controllers/iam-find-tenant-account.controller';
import { IamUpdateTenantAccountByIdController } from './controllers/iam-update-tenant-account-by-id.controller';
import { IamUpdateTenantsAccountsController } from './controllers/iam-update-tenants-accounts.controller';
import { IamUpsertTenantAccountController } from './controllers/iam-upsert-tenant-account.controller';
import { IamDeleteTenantAccountByIdController } from './controllers/iam-delete-tenant-account-by-id.controller';
import { IamDeleteTenantsAccountsController } from './controllers/iam-delete-tenants-accounts.controller';

// resolvers
import { IamCreateTenantAccountResolver } from './resolvers/iam-create-tenant-account.resolver';
import { IamCreateTenantsAccountsResolver } from './resolvers/iam-create-tenants-accounts.resolver';
import { IamPaginateTenantsAccountsResolver } from './resolvers/iam-paginate-tenants-accounts.resolver';
import { IamGetTenantsAccountsResolver } from './resolvers/iam-get-tenants-accounts.resolver';
import { IamFindTenantAccountByIdResolver } from './resolvers/iam-find-tenant-account-by-id.resolver';
import { IamFindTenantAccountResolver } from './resolvers/iam-find-tenant-account.resolver';
import { IamUpdateTenantAccountByIdResolver } from './resolvers/iam-update-tenant-account-by-id.resolver';
import { IamUpdateTenantsAccountsResolver } from './resolvers/iam-update-tenants-accounts.resolver';
import { IamUpsertTenantAccountResolver } from './resolvers/iam-upsert-tenant-account.resolver';
import { IamDeleteTenantAccountByIdResolver } from './resolvers/iam-delete-tenant-account-by-id.resolver';
import { IamDeleteTenantsAccountsResolver } from './resolvers/iam-delete-tenants-accounts.resolver';

// handlers
import { IamCreateTenantAccountHandler } from './handlers/iam-create-tenant-account.handler';
import { IamCreateTenantsAccountsHandler } from './handlers/iam-create-tenants-accounts.handler';
import { IamPaginateTenantsAccountsHandler } from './handlers/iam-paginate-tenants-accounts.handler';
import { IamGetTenantsAccountsHandler } from './handlers/iam-get-tenants-accounts.handler';
import { IamFindTenantAccountByIdHandler } from './handlers/iam-find-tenant-account-by-id.handler';
import { IamFindTenantAccountHandler } from './handlers/iam-find-tenant-account.handler';
import { IamUpdateTenantAccountByIdHandler } from './handlers/iam-update-tenant-account-by-id.handler';
import { IamUpdateTenantsAccountsHandler } from './handlers/iam-update-tenants-accounts.handler';
import { IamUpsertTenantAccountHandler } from './handlers/iam-upsert-tenant-account.handler';
import { IamDeleteTenantAccountByIdHandler } from './handlers/iam-delete-tenant-account-by-id.handler';
import { IamDeleteTenantsAccountsHandler } from './handlers/iam-delete-tenants-accounts.handler';

// seeder
import { IamTenantAccountSeeder } from './seeder/iam-tenant-account.seeder';

export const IamTenantAccountApiControllers = [
    IamCreateTenantAccountController,
    IamCreateTenantsAccountsController,
    IamPaginateTenantsAccountsController,
    IamGetTenantsAccountsController,
    IamFindTenantAccountByIdController,
    IamFindTenantAccountController,
    IamUpdateTenantAccountByIdController,
    IamUpdateTenantsAccountsController,
    IamUpsertTenantAccountController,
    IamDeleteTenantAccountByIdController,
    IamDeleteTenantsAccountsController,
];

export const IamTenantAccountApiResolvers = [
    IamCreateTenantAccountResolver,
    IamCreateTenantsAccountsResolver,
    IamPaginateTenantsAccountsResolver,
    IamGetTenantsAccountsResolver,
    IamFindTenantAccountByIdResolver,
    IamFindTenantAccountResolver,
    IamUpdateTenantAccountByIdResolver,
    IamUpdateTenantsAccountsResolver,
    IamUpsertTenantAccountResolver,
    IamDeleteTenantAccountByIdResolver,
    IamDeleteTenantsAccountsResolver,
];

export const IamTenantAccountApiHandlers = [
    IamCreateTenantAccountHandler,
    IamCreateTenantsAccountsHandler,
    IamPaginateTenantsAccountsHandler,
    IamGetTenantsAccountsHandler,
    IamFindTenantAccountByIdHandler,
    IamFindTenantAccountHandler,
    IamUpdateTenantAccountByIdHandler,
    IamUpdateTenantsAccountsHandler,
    IamUpsertTenantAccountHandler,
    IamDeleteTenantAccountByIdHandler,
    IamDeleteTenantsAccountsHandler,
];

export const IamTenantAccountApiServices = [
    IamTenantAccountSeeder,
];
