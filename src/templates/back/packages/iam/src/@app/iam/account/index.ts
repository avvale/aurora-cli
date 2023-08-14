// export commands
export { IamCreateAccountCommand } from './application/create/iam-create-account.command';
export { IamCreateAccountsCommand } from './application/create/iam-create-accounts.command';
export { IamUpdateAccountByIdCommand } from './application/update/iam-update-account-by-id.command';
export { IamUpdateAccountsCommand } from './application/update/iam-update-accounts.command';
export { IamUpsertAccountCommand } from './application/upsert/iam-upsert-account.command';
export { IamDeleteAccountByIdCommand } from './application/delete/iam-delete-account-by-id.command';
export { IamDeleteAccountsCommand } from './application/delete/iam-delete-accounts.command';

// export queries
export { IamPaginateAccountsQuery } from './application/paginate/iam-paginate-accounts.query';
export { IamGetAccountsQuery } from './application/get/iam-get-accounts.query';
export { IamFindAccountQuery } from './application/find/iam-find-account.query';
export { IamFindAccountByIdQuery } from './application/find/iam-find-account-by-id.query';
export { IamRawSQLAccountsQuery } from './application/raw-sql/iam-raw-sql-accounts.query';

// export mocks
export { iamMockAccountData } from './infrastructure/mock/iam-mock-account.data';
export { IamMockAccountSeeder } from './infrastructure/mock/iam-mock-account.seeder';
export { IamMockAccountRepository } from './infrastructure/mock/iam-mock-account.repository';

// export events
export { IamAddAccountsContextEvent } from './application/events/iam-add-accounts-context.event';
export { IamCreatedAccountsEvent } from './application/events/iam-created-accounts.event';
export { IamCreatedAccountEvent } from './application/events/iam-created-account.event';
export { IamDeletedAccountsEvent } from './application/events/iam-deleted-accounts.event';
export { IamDeletedAccountEvent } from './application/events/iam-deleted-account.event';
export { IamUpdatedAccountsEvent } from './application/events/iam-updated-accounts.event';
export { IamUpdatedAccountEvent } from './application/events/iam-updated-account.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { IamAccount } from './domain/iam-account.aggregate';
export { IamAccountMapper } from './domain/iam-account.mapper';
export { IamIAccountRepository } from './domain/iam-account.repository';
export { IamAccountResponse } from './domain/iam-account.response';

// infrastructure
export { IamAccountModel } from './infrastructure/sequelize/iam-sequelize-account.model';
export { IamSequelizeAccountRepository } from './infrastructure/sequelize/iam-sequelize-account.repository';

// sagas
export { IamAccountSagas } from './application/sagas/iam-account.sagas';

// command handlers
import { IamCreateAccountCommandHandler } from './application/create/iam-create-account.command-handler';
import { IamCreateAccountsCommandHandler } from './application/create/iam-create-accounts.command-handler';
import { IamUpdateAccountByIdCommandHandler } from './application/update/iam-update-account-by-id.command-handler';
import { IamUpdateAccountsCommandHandler } from './application/update/iam-update-accounts.command-handler';
import { IamUpsertAccountCommandHandler } from './application/upsert/iam-upsert-account.command-handler';
import { IamDeleteAccountByIdCommandHandler } from './application/delete/iam-delete-account-by-id.command-handler';
import { IamDeleteAccountsCommandHandler } from './application/delete/iam-delete-accounts.command-handler';

// query handlers
import { IamPaginateAccountsQueryHandler } from './application/paginate/iam-paginate-accounts.query-handler';
import { IamGetAccountsQueryHandler } from './application/get/iam-get-accounts.query-handler';
import { IamFindAccountQueryHandler } from './application/find/iam-find-account.query-handler';
import { IamFindAccountByIdQueryHandler } from './application/find/iam-find-account-by-id.query-handler';
import { IamRawSQLAccountsQueryHandler } from './application/raw-sql/iam-raw-sql-accounts.query-handler';

// event handlers
import { IamCreatedAccountEventHandler } from './application/events/iam-created-account.event-handler';
import { IamCreatedAccountsEventHandler } from './application/events/iam-created-accounts.event-handler';
import { IamUpdatedAccountEventHandler } from './application/events/iam-updated-account.event-handler';
import { IamUpdatedAccountsEventHandler } from './application/events/iam-updated-accounts.event-handler';
import { IamDeletedAccountEventHandler } from './application/events/iam-deleted-account.event-handler';
import { IamDeletedAccountsEventHandler } from './application/events/iam-deleted-accounts.event-handler';

// services
import { IamCreateAccountService } from './application/create/iam-create-account.service';
import { IamCreateAccountsService } from './application/create/iam-create-accounts.service';
import { IamPaginateAccountsService } from './application/paginate/iam-paginate-accounts.service';
import { IamGetAccountsService } from './application/get/iam-get-accounts.service';
import { IamFindAccountService } from './application/find/iam-find-account.service';
import { IamFindAccountByIdService } from './application/find/iam-find-account-by-id.service';
import { IamRawSQLAccountsService } from './application/raw-sql/iam-raw-sql-accounts.service';
import { IamUpdateAccountByIdService } from './application/update/iam-update-account-by-id.service';
import { IamUpdateAccountsService } from './application/update/iam-update-accounts.service';
import { IamUpsertAccountService } from './application/upsert/iam-upsert-account.service';
import { IamDeleteAccountByIdService } from './application/delete/iam-delete-account-by-id.service';
import { IamDeleteAccountsService } from './application/delete/iam-delete-accounts.service';

export const IamAccountHandlers = [
    // commands
    IamCreateAccountCommandHandler,
    IamCreateAccountsCommandHandler,
    IamUpdateAccountByIdCommandHandler,
    IamUpdateAccountsCommandHandler,
    IamUpsertAccountCommandHandler,
    IamDeleteAccountByIdCommandHandler,
    IamDeleteAccountsCommandHandler,

    // queries
    IamPaginateAccountsQueryHandler,
    IamGetAccountsQueryHandler,
    IamFindAccountQueryHandler,
    IamFindAccountByIdQueryHandler,
    IamRawSQLAccountsQueryHandler,

    // events
    IamCreatedAccountEventHandler,
    IamCreatedAccountsEventHandler,
    IamUpdatedAccountEventHandler,
    IamUpdatedAccountsEventHandler,
    IamDeletedAccountEventHandler,
    IamDeletedAccountsEventHandler,
];

export const IamAccountServices = [
    IamCreateAccountService,
    IamCreateAccountsService,
    IamPaginateAccountsService,
    IamGetAccountsService,
    IamFindAccountService,
    IamFindAccountByIdService,
    IamRawSQLAccountsService,
    IamUpdateAccountByIdService,
    IamUpdateAccountsService,
    IamUpsertAccountService,
    IamDeleteAccountByIdService,
    IamDeleteAccountsService,
];