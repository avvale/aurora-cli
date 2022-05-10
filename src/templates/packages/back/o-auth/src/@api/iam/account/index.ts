// controllers
import { IamCreateAccountController } from './controllers/iam-create-account.controller';
import { IamPaginateAccountsController } from './controllers/iam-paginate-accounts.controller';
import { IamGetAccountsController } from './controllers/iam-get-accounts.controller';
import { IamFindAccountByIdController } from './controllers/iam-find-account-by-id.controller';
import { IamFindAccountController } from './controllers/iam-find-account.controller';
import { IamUpdateAccountByIdController } from './controllers/iam-update-account-by-id.controller';
import { IamUpdateAccountsController } from './controllers/iam-update-accounts.controller';
import { IamDeleteAccountByIdController } from './controllers/iam-delete-account-by-id.controller';
import { IamDeleteAccountsController } from './controllers/iam-delete-accounts.controller';

// resolvers
import { IamCreateAccountResolver } from './resolvers/iam-create-account.resolver';
import { IamPaginateAccountsResolver } from './resolvers/iam-paginate-accounts.resolver';
import { IamGetAccountsResolver } from './resolvers/iam-get-accounts.resolver';
import { IamFindAccountByIdResolver } from './resolvers/iam-find-account-by-id.resolver';
import { IamFindAccountResolver } from './resolvers/iam-find-account.resolver';
import { IamUpdateAccountByIdResolver } from './resolvers/iam-update-account-by-id.resolver';
import { IamUpdateAccountsResolver } from './resolvers/iam-update-accounts.resolver';
import { IamDeleteAccountByIdResolver } from './resolvers/iam-delete-account-by-id.resolver';
import { IamDeleteAccountsResolver } from './resolvers/iam-delete-accounts.resolver';

// handlers
import { IamCreateAccountHandler } from './handlers/iam-create-account.handler';
import { IamPaginateAccountsHandler } from './handlers/iam-paginate-accounts.handler';
import { IamGetAccountsHandler } from './handlers/iam-get-accounts.handler';
import { IamFindAccountByIdHandler } from './handlers/iam-find-account-by-id.handler';
import { IamFindAccountHandler } from './handlers/iam-find-account.handler';
import { IamUpdateAccountByIdHandler } from './handlers/iam-update-account-by-id.handler';
import { IamUpdateAccountsHandler } from './handlers/iam-update-accounts.handler';
import { IamDeleteAccountByIdHandler } from './handlers/iam-delete-account-by-id.handler';
import { IamDeleteAccountsHandler } from './handlers/iam-delete-accounts.handler';

// ---- customizations ----
import { IamMeAccountController } from './controllers/iam-me-account.controller';
import { IamMeAccountResolver } from './resolvers/iam-me-account.resolver';
import { IamMeAccountHandler } from './handlers/iam-me-account.handler';

export const IamAccountControllers = [
    IamCreateAccountController,
    IamPaginateAccountsController,
    IamGetAccountsController,
    IamFindAccountByIdController,
    IamFindAccountController,
    IamUpdateAccountByIdController,
    IamUpdateAccountsController,
    IamDeleteAccountByIdController,
    IamDeleteAccountsController,
    IamMeAccountController,
];

export const IamAccountResolvers = [
    IamCreateAccountResolver,
    IamPaginateAccountsResolver,
    IamGetAccountsResolver,
    IamFindAccountByIdResolver,
    IamFindAccountResolver,
    IamUpdateAccountByIdResolver,
    IamUpdateAccountsResolver,
    IamDeleteAccountByIdResolver,
    IamDeleteAccountsResolver,
    IamMeAccountResolver,
];

export const IamAccountApiHandlers = [
    IamCreateAccountHandler,
    IamPaginateAccountsHandler,
    IamGetAccountsHandler,
    IamFindAccountByIdHandler,
    IamFindAccountHandler,
    IamUpdateAccountByIdHandler,
    IamUpdateAccountsHandler,
    IamDeleteAccountByIdHandler,
    IamDeleteAccountsHandler,
    IamMeAccountHandler,
];