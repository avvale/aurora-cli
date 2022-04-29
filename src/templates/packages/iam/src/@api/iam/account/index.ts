// controllers
import { IamCreateAccountController } from './controllers/iam-create-account.controller';
import { IamCreateAccountsController } from './controllers/iam-create-accounts.controller';
import { IamPaginateAccountsController } from './controllers/iam-paginate-accounts.controller';
import { IamGetAccountsController } from './controllers/iam-get-accounts.controller';
import { IamFindAccountByIdController } from './controllers/iam-find-account-by-id.controller';
import { IamFindAccountController } from './controllers/iam-find-account.controller';
import { IamUpdateAccountController } from './controllers/iam-update-account.controller';
import { IamDeleteAccountByIdController } from './controllers/iam-delete-account-by-id.controller';
import { IamDeleteAccountsController } from './controllers/iam-delete-accounts.controller';

// resolvers
import { IamCreateAccountResolver } from './resolvers/iam-create-account.resolver';
import { IamCreateAccountsResolver } from './resolvers/iam-create-accounts.resolver';
import { IamPaginateAccountsResolver } from './resolvers/iam-paginate-accounts.resolver';
import { IamGetAccountsResolver } from './resolvers/iam-get-accounts.resolver';
import { IamFindAccountByIdResolver } from './resolvers/iam-find-account-by-id.resolver';
import { IamFindAccountResolver } from './resolvers/iam-find-account.resolver';
import { IamUpdateAccountResolver } from './resolvers/iam-update-account.resolver';
import { IamDeleteAccountByIdResolver } from './resolvers/iam-delete-account-by-id.resolver';
import { IamDeleteAccountsResolver } from './resolvers/iam-delete-accounts.resolver';

// handlers
import { IamCreateAccountHandler } from './handlers/iam-create-account.handler';
import { IamCreateAccountsHandler } from './handlers/iam-create-accounts.handler';
import { IamPaginateAccountsHandler } from './handlers/iam-paginate-accounts.handler';
import { IamGetAccountsHandler } from './handlers/iam-get-accounts.handler';
import { IamFindAccountByIdHandler } from './handlers/iam-find-account-by-id.handler';
import { IamFindAccountHandler } from './handlers/iam-find-account.handler';
import { IamUpdateAccountHandler } from './handlers/iam-update-account.handler';
import { IamDeleteAccountByIdHandler } from './handlers/iam-delete-account-by-id.handler';
import { IamDeleteAccountsHandler } from './handlers/iam-delete-accounts.handler';

export const IamAccountControllers = [
    IamCreateAccountController,
    IamCreateAccountsController,
    IamPaginateAccountsController,
    IamGetAccountsController,
    IamFindAccountByIdController,
    IamFindAccountController,
    IamUpdateAccountController,
    IamDeleteAccountByIdController,
    IamDeleteAccountsController,
];

export const IamAccountResolvers = [
    IamCreateAccountResolver,
    IamCreateAccountsResolver,
    IamPaginateAccountsResolver,
    IamGetAccountsResolver,
    IamFindAccountByIdResolver,
    IamFindAccountResolver,
    IamUpdateAccountResolver,
    IamDeleteAccountByIdResolver,
    IamDeleteAccountsResolver,
];

export const IamAccountApiHandlers = [
    IamCreateAccountHandler,
    IamCreateAccountsHandler,
    IamPaginateAccountsHandler,
    IamGetAccountsHandler,
    IamFindAccountByIdHandler,
    IamFindAccountHandler,
    IamUpdateAccountHandler,
    IamDeleteAccountByIdHandler,
    IamDeleteAccountsHandler,
];