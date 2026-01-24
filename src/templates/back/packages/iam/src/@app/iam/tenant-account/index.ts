// export commands
export { IamCreateTenantAccountCommand } from './application/create/iam-create-tenant-account.command';
export { IamCreateTenantsAccountsCommand } from './application/create/iam-create-tenants-accounts.command';
export { IamDeleteTenantAccountByIdCommand } from './application/delete/iam-delete-tenant-account-by-id.command';
export { IamDeleteTenantsAccountsCommand } from './application/delete/iam-delete-tenants-accounts.command';
export { IamUpdateTenantAccountByIdCommand } from './application/update/iam-update-tenant-account-by-id.command';
export { IamUpdateTenantsAccountsCommand } from './application/update/iam-update-tenants-accounts.command';

// export queries
export { IamFindTenantAccountByIdQuery } from './application/find/iam-find-tenant-account-by-id.query';
export { IamFindTenantAccountQuery } from './application/find/iam-find-tenant-account.query';
export { IamGetTenantsAccountsQuery } from './application/get/iam-get-tenants-accounts.query';
export { IamPaginateTenantsAccountsQuery } from './application/paginate/iam-paginate-tenants-accounts.query';

// export mocks
export { iamMockTenantAccountData } from './infrastructure/mock/iam-mock-tenant-account.data';
export { IamMockTenantAccountRepository } from './infrastructure/mock/iam-mock-tenant-account.repository';
export { IamMockTenantAccountSeeder } from './infrastructure/mock/iam-mock-tenant-account.seeder';

// export events
export { IamAddTenantsAccountsContextEvent } from './application/events/iam-add-tenants-accounts-context.event';
export { IamCreatedTenantAccountEvent } from './application/events/iam-created-tenant-account.event';
export { IamCreatedTenantsAccountsEvent } from './application/events/iam-created-tenants-accounts.event';
export { IamDeletedTenantAccountEvent } from './application/events/iam-deleted-tenant-account.event';
export { IamDeletedTenantsAccountsEvent } from './application/events/iam-deleted-tenants-accounts.event';
export { IamUpdatedTenantAccountEvent } from './application/events/iam-updated-tenant-account.event';
export { IamUpdatedTenantsAccountsEvent } from './application/events/iam-updated-tenants-accounts.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { IamTenantAccount } from './domain/iam-tenant-account.aggregate';
export { IamTenantAccountMapper } from './domain/iam-tenant-account.mapper';
export { IamITenantAccountRepository } from './domain/iam-tenant-account.repository';
export { IamTenantAccountResponse } from './domain/iam-tenant-account.response';

// infrastructure
export { IamTenantAccountModel } from './infrastructure/sequelize/iam-sequelize-tenant-account.model';
export { IamSequelizeTenantAccountRepository } from './infrastructure/sequelize/iam-sequelize-tenant-account.repository';

// sagas
export { IamTenantAccountSagas } from './application/sagas/iam-tenant-account.sagas';

// command handlers
import { IamCreateTenantAccountCommandHandler } from './application/create/iam-create-tenant-account.command-handler';
import { IamCreateTenantsAccountsCommandHandler } from './application/create/iam-create-tenants-accounts.command-handler';
import { IamDeleteTenantAccountByIdCommandHandler } from './application/delete/iam-delete-tenant-account-by-id.command-handler';
import { IamDeleteTenantsAccountsCommandHandler } from './application/delete/iam-delete-tenants-accounts.command-handler';
import { IamUpdateTenantAccountByIdCommandHandler } from './application/update/iam-update-tenant-account-by-id.command-handler';
import { IamUpdateTenantsAccountsCommandHandler } from './application/update/iam-update-tenants-accounts.command-handler';

// query handlers
import { IamFindTenantAccountByIdQueryHandler } from './application/find/iam-find-tenant-account-by-id.query-handler';
import { IamFindTenantAccountQueryHandler } from './application/find/iam-find-tenant-account.query-handler';
import { IamGetTenantsAccountsQueryHandler } from './application/get/iam-get-tenants-accounts.query-handler';
import { IamPaginateTenantsAccountsQueryHandler } from './application/paginate/iam-paginate-tenants-accounts.query-handler';

// event handlers
import { IamCreatedTenantAccountEventHandler } from './application/events/iam-created-tenant-account.event-handler';
import { IamCreatedTenantsAccountsEventHandler } from './application/events/iam-created-tenants-accounts.event-handler';
import { IamDeletedTenantAccountEventHandler } from './application/events/iam-deleted-tenant-account.event-handler';
import { IamDeletedTenantsAccountsEventHandler } from './application/events/iam-deleted-tenants-accounts.event-handler';
import { IamUpdatedTenantAccountEventHandler } from './application/events/iam-updated-tenant-account.event-handler';
import { IamUpdatedTenantsAccountsEventHandler } from './application/events/iam-updated-tenants-accounts.event-handler';

// services
import { IamCreateTenantAccountService } from './application/create/iam-create-tenant-account.service';
import { IamCreateTenantsAccountsService } from './application/create/iam-create-tenants-accounts.service';
import { IamDeleteTenantAccountByIdService } from './application/delete/iam-delete-tenant-account-by-id.service';
import { IamDeleteTenantsAccountsService } from './application/delete/iam-delete-tenants-accounts.service';
import { IamFindTenantAccountByIdService } from './application/find/iam-find-tenant-account-by-id.service';
import { IamFindTenantAccountService } from './application/find/iam-find-tenant-account.service';
import { IamGetTenantsAccountsService } from './application/get/iam-get-tenants-accounts.service';
import { IamPaginateTenantsAccountsService } from './application/paginate/iam-paginate-tenants-accounts.service';
import { IamUpdateTenantAccountByIdService } from './application/update/iam-update-tenant-account-by-id.service';
import { IamUpdateTenantsAccountsService } from './application/update/iam-update-tenants-accounts.service';

export const IamTenantAccountHandlers = [
  // commands
  IamCreateTenantAccountCommandHandler,
  IamCreateTenantsAccountsCommandHandler,
  IamUpdateTenantAccountByIdCommandHandler,
  IamUpdateTenantsAccountsCommandHandler,
  IamDeleteTenantAccountByIdCommandHandler,
  IamDeleteTenantsAccountsCommandHandler,

  // queries
  IamPaginateTenantsAccountsQueryHandler,
  IamGetTenantsAccountsQueryHandler,
  IamFindTenantAccountQueryHandler,
  IamFindTenantAccountByIdQueryHandler,

  // events
  IamCreatedTenantAccountEventHandler,
  IamCreatedTenantsAccountsEventHandler,
  IamUpdatedTenantAccountEventHandler,
  IamUpdatedTenantsAccountsEventHandler,
  IamDeletedTenantAccountEventHandler,
  IamDeletedTenantsAccountsEventHandler,
];

export const IamTenantAccountServices = [
  IamCreateTenantAccountService,
  IamCreateTenantsAccountsService,
  IamPaginateTenantsAccountsService,
  IamGetTenantsAccountsService,
  IamFindTenantAccountService,
  IamFindTenantAccountByIdService,
  IamUpdateTenantAccountByIdService,
  IamUpdateTenantsAccountsService,
  IamDeleteTenantAccountByIdService,
  IamDeleteTenantsAccountsService,
];
