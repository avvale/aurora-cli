export * from './shared';

// export DTOs
export { IamAccountDto } from './dto/iam-account.dto';
export { IamCreateAccountDto } from './dto/iam-create-account.dto';
export { IamUpdateAccountByIdDto } from './dto/iam-update-account-by-id.dto';
export { IamUpdateAccountsDto } from './dto/iam-update-accounts.dto';

// export handlers
export { IamCreateAccountHandler } from './handlers/iam-create-account.handler';
export { IamPaginateAccountsHandler } from './handlers/iam-paginate-accounts.handler';
export { IamGetAccountsHandler } from './handlers/iam-get-accounts.handler';
export { IamFindAccountByIdHandler } from './handlers/iam-find-account-by-id.handler';
export { IamFindAccountHandler } from './handlers/iam-find-account.handler';
export { IamUpdateAccountByIdHandler } from './handlers/iam-update-account-by-id.handler';
export { IamUpdateAccountsHandler } from './handlers/iam-update-accounts.handler';
export { IamUpsertAccountHandler } from './handlers/iam-upsert-account.handler';
export { IamDeleteAccountByIdHandler } from './handlers/iam-delete-account-by-id.handler';
export { IamDeleteAccountsHandler } from './handlers/iam-delete-accounts.handler';

// export controllers
export { IamCreateAccountController } from './controllers/iam-create-account.controller';
export { IamPaginateAccountsController } from './controllers/iam-paginate-accounts.controller';
export { IamGetAccountsController } from './controllers/iam-get-accounts.controller';
export { IamFindAccountByIdController } from './controllers/iam-find-account-by-id.controller';
export { IamFindAccountController } from './controllers/iam-find-account.controller';
export { IamUpdateAccountByIdController } from './controllers/iam-update-account-by-id.controller';
export { IamUpdateAccountsController } from './controllers/iam-update-accounts.controller';
export { IamDeleteAccountByIdController } from './controllers/iam-delete-account-by-id.controller';
export { IamDeleteAccountsController } from './controllers/iam-delete-accounts.controller';

// export resolvers
export { IamCreateAccountResolver } from './resolvers/iam-create-account.resolver';
export { IamPaginateAccountsResolver } from './resolvers/iam-paginate-accounts.resolver';
export { IamGetAccountsResolver } from './resolvers/iam-get-accounts.resolver';
export { IamFindAccountByIdResolver } from './resolvers/iam-find-account-by-id.resolver';
export { IamFindAccountResolver } from './resolvers/iam-find-account.resolver';
export { IamUpdateAccountByIdResolver } from './resolvers/iam-update-account-by-id.resolver';
export { IamUpdateAccountsResolver } from './resolvers/iam-update-accounts.resolver';
export { IamDeleteAccountByIdResolver } from './resolvers/iam-delete-account-by-id.resolver';
export { IamDeleteAccountsResolver } from './resolvers/iam-delete-accounts.resolver';

// export additionalApis
export { IamUpdateMeAccountController } from './controllers/iam-update-me-account.controller';
export { IamUpdateMeAccountHandler } from './handlers/iam-update-me-account.handler';
export { IamUpdateMeAccountResolver } from './resolvers/iam-update-me-account.resolver';
export { IamCheckPasswordMeAccountController } from './controllers/iam-check-password-me-account.controller';
export { IamCheckPasswordMeAccountHandler } from './handlers/iam-check-password-me-account.handler';
export { IamCheckPasswordMeAccountResolver } from './resolvers/iam-check-password-me-account.resolver';
export { IamCheckUniqueUsernameAccountController } from './controllers/iam-check-unique-username-account.controller';
export { IamCheckUniqueUsernameAccountHandler } from './handlers/iam-check-unique-username-account.handler';
export { IamCheckUniqueUsernameAccountResolver } from './resolvers/iam-check-unique-username-account.resolver';
export { IamCheckUniqueEmailAccountController } from './controllers/iam-check-unique-email-account.controller';
export { IamCheckUniqueEmailAccountHandler } from './handlers/iam-check-unique-email-account.handler';
export { IamCheckUniqueEmailAccountResolver } from './resolvers/iam-check-unique-email-account.resolver';

// import controllers
import { IamCreateAccountController } from './controllers/iam-create-account.controller';
import { IamPaginateAccountsController } from './controllers/iam-paginate-accounts.controller';
import { IamGetAccountsController } from './controllers/iam-get-accounts.controller';
import { IamFindAccountByIdController } from './controllers/iam-find-account-by-id.controller';
import { IamFindAccountController } from './controllers/iam-find-account.controller';
import { IamUpdateAccountByIdController } from './controllers/iam-update-account-by-id.controller';
import { IamUpdateAccountsController } from './controllers/iam-update-accounts.controller';
import { IamDeleteAccountByIdController } from './controllers/iam-delete-account-by-id.controller';
import { IamDeleteAccountsController } from './controllers/iam-delete-accounts.controller';

// import resolvers
import { IamCreateAccountResolver } from './resolvers/iam-create-account.resolver';
import { IamPaginateAccountsResolver } from './resolvers/iam-paginate-accounts.resolver';
import { IamGetAccountsResolver } from './resolvers/iam-get-accounts.resolver';
import { IamFindAccountByIdResolver } from './resolvers/iam-find-account-by-id.resolver';
import { IamFindAccountResolver } from './resolvers/iam-find-account.resolver';
import { IamUpdateAccountByIdResolver } from './resolvers/iam-update-account-by-id.resolver';
import { IamUpdateAccountsResolver } from './resolvers/iam-update-accounts.resolver';
import { IamDeleteAccountByIdResolver } from './resolvers/iam-delete-account-by-id.resolver';
import { IamDeleteAccountsResolver } from './resolvers/iam-delete-accounts.resolver';

// import handlers
import { IamCreateAccountHandler } from './handlers/iam-create-account.handler';
import { IamPaginateAccountsHandler } from './handlers/iam-paginate-accounts.handler';
import { IamGetAccountsHandler } from './handlers/iam-get-accounts.handler';
import { IamFindAccountByIdHandler } from './handlers/iam-find-account-by-id.handler';
import { IamFindAccountHandler } from './handlers/iam-find-account.handler';
import { IamUpdateAccountByIdHandler } from './handlers/iam-update-account-by-id.handler';
import { IamUpdateAccountsHandler } from './handlers/iam-update-accounts.handler';
import { IamUpsertAccountHandler } from './handlers/iam-upsert-account.handler';
import { IamDeleteAccountByIdHandler } from './handlers/iam-delete-account-by-id.handler';
import { IamDeleteAccountsHandler } from './handlers/iam-delete-accounts.handler';

// import seeder
import { IamAccountSeeder } from './seeder/iam-account.seeder';

// ---- customizations ----
import { IamMeAccountController } from './controllers/iam-me-account.controller';
import { IamMeAccountResolver } from './resolvers/iam-me-account.resolver';
import { IamMeAccountHandler } from './handlers/iam-me-account.handler';

// import additionalApis
import { IamUpdateMeAccountController } from './controllers/iam-update-me-account.controller';
import { IamUpdateMeAccountHandler } from './handlers/iam-update-me-account.handler';
import { IamUpdateMeAccountResolver } from './resolvers/iam-update-me-account.resolver';
import { IamCheckPasswordMeAccountController } from './controllers/iam-check-password-me-account.controller';
import { IamCheckPasswordMeAccountHandler } from './handlers/iam-check-password-me-account.handler';
import { IamCheckPasswordMeAccountResolver } from './resolvers/iam-check-password-me-account.resolver';
import { IamCheckUniqueUsernameAccountController } from './controllers/iam-check-unique-username-account.controller';
import { IamCheckUniqueUsernameAccountHandler } from './handlers/iam-check-unique-username-account.handler';
import { IamCheckUniqueUsernameAccountResolver } from './resolvers/iam-check-unique-username-account.resolver';
import { IamCheckUniqueEmailAccountController } from './controllers/iam-check-unique-email-account.controller';
import { IamCheckUniqueEmailAccountHandler } from './handlers/iam-check-unique-email-account.handler';
import { IamCheckUniqueEmailAccountResolver } from './resolvers/iam-check-unique-email-account.resolver';
import { IamPaginateWithTenantConstraintAccountsController } from './controllers/iam-paginate-with-tenant-constraint-accounts.controller';
import { IamPaginateWithTenantConstraintAccountsResolver } from './resolvers/iam-paginate-with-tenant-constraint-accounts.resolver';

export const IamAccountApiControllers = [
    // ---- customizations ----
    IamMeAccountController,

    IamCreateAccountController,
    IamPaginateAccountsController,
    IamGetAccountsController,
    IamFindAccountByIdController,
    IamFindAccountController,
    IamUpdateAccountByIdController,
    IamUpdateAccountsController,
    IamDeleteAccountByIdController,
    IamDeleteAccountsController,

    // additionalApis
    IamUpdateMeAccountController,
    IamCheckPasswordMeAccountController,
    IamCheckUniqueUsernameAccountController,
    IamCheckUniqueEmailAccountController,
    IamPaginateWithTenantConstraintAccountsController,
];

export const IamAccountApiResolvers = [
    // ---- customizations ----
    IamMeAccountResolver,

    IamCreateAccountResolver,
    IamPaginateAccountsResolver,
    IamGetAccountsResolver,
    IamFindAccountByIdResolver,
    IamFindAccountResolver,
    IamUpdateAccountByIdResolver,
    IamUpdateAccountsResolver,
    IamDeleteAccountByIdResolver,
    IamDeleteAccountsResolver,

    // additionalApis
    IamUpdateMeAccountResolver,
    IamCheckPasswordMeAccountResolver,
    IamCheckUniqueUsernameAccountResolver,
    IamCheckUniqueEmailAccountResolver,
    IamPaginateWithTenantConstraintAccountsResolver,
];

export const IamAccountApiHandlers = [
    // ---- customizations ----
    IamMeAccountHandler,

    IamCreateAccountHandler,
    IamPaginateAccountsHandler,
    IamGetAccountsHandler,
    IamFindAccountByIdHandler,
    IamFindAccountHandler,
    IamUpdateAccountByIdHandler,
    IamUpdateAccountsHandler,
    IamUpsertAccountHandler,
    IamDeleteAccountByIdHandler,
    IamDeleteAccountsHandler,

    // additionalApis
    IamUpdateMeAccountHandler,
    IamCheckPasswordMeAccountHandler,
    IamCheckUniqueUsernameAccountHandler,
    IamCheckUniqueEmailAccountHandler,
];

export const IamAccountApiServices = [
    IamAccountSeeder,
];
