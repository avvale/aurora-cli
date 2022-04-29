// commands
import { CreateAccountCommandHandler } from './application/create/create-account.command-handler';
import { CreateAccountsCommandHandler } from './application/create/create-accounts.command-handler';
import { UpdateAccountCommandHandler } from './application/update/update-account.command-handler';
import { DeleteAccountByIdCommandHandler } from './application/delete/delete-account-by-id.command-handler';
import { DeleteAccountsCommandHandler } from './application/delete/delete-accounts.command-handler';

// queries
import { PaginateAccountsQueryHandler } from './application/paginate/paginate-accounts.query-handler';
import { GetAccountsQueryHandler } from './application/get/get-accounts.query-handler';
import { FindAccountQueryHandler } from './application/find/find-account.query-handler';
import { FindAccountByIdQueryHandler } from './application/find/find-account-by-id.query-handler';

// events
import { CreatedAccountEventHandler } from './application/events/created-account.event-handler';
import { CreatedAccountsEventHandler } from './application/events/created-accounts.event-handler';
import { UpdatedAccountEventHandler } from './application/events/updated-account.event-handler';
import { DeletedAccountEventHandler } from './application/events/deleted-account.event-handler';
import { DeletedAccountsEventHandler } from './application/events/deleted-accounts.event-handler';

// services
import { CreateAccountService } from './application/create/create-account.service';
import { CreateAccountsService } from './application/create/create-accounts.service';
import { PaginateAccountsService } from './application/paginate/paginate-accounts.service';
import { GetAccountsService } from './application/get/get-accounts.service';
import { FindAccountService } from './application/find/find-account.service';
import { FindAccountByIdService } from './application/find/find-account-by-id.service';
import { UpdateAccountService } from './application/update/update-account.service';
import { DeleteAccountByIdService } from './application/delete/delete-account-by-id.service';
import { DeleteAccountsService } from './application/delete/delete-accounts.service';

// models
export { IamAccountModel } from './infrastructure/sequelize/sequelize-account.model';

// repository
export { IAccountRepository } from './domain/account.repository';
export { SequelizeAccountRepository } from './infrastructure/sequelize/sequelize-account.repository';

// sagas
export { AccountSagas } from './application/sagas/account.sagas';

export const IamAccountHandlers = [
    // commands
    CreateAccountCommandHandler,
    CreateAccountsCommandHandler,
    UpdateAccountCommandHandler,
    DeleteAccountByIdCommandHandler,
    DeleteAccountsCommandHandler,

    // queries
    PaginateAccountsQueryHandler,
    GetAccountsQueryHandler,
    FindAccountQueryHandler,
    FindAccountByIdQueryHandler,

    // events
    CreatedAccountEventHandler,
    CreatedAccountsEventHandler,
    UpdatedAccountEventHandler,
    DeletedAccountEventHandler,
    DeletedAccountsEventHandler,
];

export const IamAccountServices = [
    CreateAccountService,
    CreateAccountsService,
    PaginateAccountsService,
    GetAccountsService,
    FindAccountService,
    FindAccountByIdService,
    UpdateAccountService,
    DeleteAccountByIdService,
    DeleteAccountsService,
];