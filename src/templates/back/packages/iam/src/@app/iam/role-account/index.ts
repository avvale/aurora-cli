// export commands
export { IamCreateRoleAccountCommand } from './application/create/iam-create-role-account.command';
export { IamCreateRolesAccountsCommand } from './application/create/iam-create-roles-accounts.command';
export { IamDeleteRoleAccountByIdCommand } from './application/delete/iam-delete-role-account-by-id.command';
export { IamDeleteRolesAccountsCommand } from './application/delete/iam-delete-roles-accounts.command';
export { IamUpdateRoleAccountByIdCommand } from './application/update/iam-update-role-account-by-id.command';
export { IamUpdateRolesAccountsCommand } from './application/update/iam-update-roles-accounts.command';

// export queries
export { IamFindRoleAccountByIdQuery } from './application/find/iam-find-role-account-by-id.query';
export { IamFindRoleAccountQuery } from './application/find/iam-find-role-account.query';
export { IamGetRolesAccountsQuery } from './application/get/iam-get-roles-accounts.query';
export { IamPaginateRolesAccountsQuery } from './application/paginate/iam-paginate-roles-accounts.query';

// export mocks
export { iamMockRoleAccountData } from './infrastructure/mock/iam-mock-role-account.data';
export { IamMockRoleAccountRepository } from './infrastructure/mock/iam-mock-role-account.repository';
export { IamMockRoleAccountSeeder } from './infrastructure/mock/iam-mock-role-account.seeder';

// export events
export { IamAddRolesAccountsContextEvent } from './application/events/iam-add-roles-accounts-context.event';
export { IamCreatedRoleAccountEvent } from './application/events/iam-created-role-account.event';
export { IamCreatedRolesAccountsEvent } from './application/events/iam-created-roles-accounts.event';
export { IamDeletedRoleAccountEvent } from './application/events/iam-deleted-role-account.event';
export { IamDeletedRolesAccountsEvent } from './application/events/iam-deleted-roles-accounts.event';
export { IamUpdatedRoleAccountEvent } from './application/events/iam-updated-role-account.event';
export { IamUpdatedRolesAccountsEvent } from './application/events/iam-updated-roles-accounts.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { IamRoleAccount } from './domain/iam-role-account.aggregate';
export { IamRoleAccountMapper } from './domain/iam-role-account.mapper';
export { IamIRoleAccountRepository } from './domain/iam-role-account.repository';
export { IamRoleAccountResponse } from './domain/iam-role-account.response';

// infrastructure
export { IamRoleAccountModel } from './infrastructure/sequelize/iam-sequelize-role-account.model';
export { IamSequelizeRoleAccountRepository } from './infrastructure/sequelize/iam-sequelize-role-account.repository';

// sagas
export { IamRoleAccountSagas } from './application/sagas/iam-role-account.sagas';

// command handlers
import { IamCreateRoleAccountCommandHandler } from './application/create/iam-create-role-account.command-handler';
import { IamCreateRolesAccountsCommandHandler } from './application/create/iam-create-roles-accounts.command-handler';
import { IamDeleteRoleAccountByIdCommandHandler } from './application/delete/iam-delete-role-account-by-id.command-handler';
import { IamDeleteRolesAccountsCommandHandler } from './application/delete/iam-delete-roles-accounts.command-handler';
import { IamUpdateRoleAccountByIdCommandHandler } from './application/update/iam-update-role-account-by-id.command-handler';
import { IamUpdateRolesAccountsCommandHandler } from './application/update/iam-update-roles-accounts.command-handler';

// query handlers
import { IamFindRoleAccountByIdQueryHandler } from './application/find/iam-find-role-account-by-id.query-handler';
import { IamFindRoleAccountQueryHandler } from './application/find/iam-find-role-account.query-handler';
import { IamGetRolesAccountsQueryHandler } from './application/get/iam-get-roles-accounts.query-handler';
import { IamPaginateRolesAccountsQueryHandler } from './application/paginate/iam-paginate-roles-accounts.query-handler';

// event handlers
import { IamCreatedRoleAccountEventHandler } from './application/events/iam-created-role-account.event-handler';
import { IamCreatedRolesAccountsEventHandler } from './application/events/iam-created-roles-accounts.event-handler';
import { IamDeletedRoleAccountEventHandler } from './application/events/iam-deleted-role-account.event-handler';
import { IamDeletedRolesAccountsEventHandler } from './application/events/iam-deleted-roles-accounts.event-handler';
import { IamUpdatedRoleAccountEventHandler } from './application/events/iam-updated-role-account.event-handler';
import { IamUpdatedRolesAccountsEventHandler } from './application/events/iam-updated-roles-accounts.event-handler';

// services
import { IamCreateRoleAccountService } from './application/create/iam-create-role-account.service';
import { IamCreateRolesAccountsService } from './application/create/iam-create-roles-accounts.service';
import { IamDeleteRoleAccountByIdService } from './application/delete/iam-delete-role-account-by-id.service';
import { IamDeleteRolesAccountsService } from './application/delete/iam-delete-roles-accounts.service';
import { IamFindRoleAccountByIdService } from './application/find/iam-find-role-account-by-id.service';
import { IamFindRoleAccountService } from './application/find/iam-find-role-account.service';
import { IamGetRolesAccountsService } from './application/get/iam-get-roles-accounts.service';
import { IamPaginateRolesAccountsService } from './application/paginate/iam-paginate-roles-accounts.service';
import { IamUpdateRoleAccountByIdService } from './application/update/iam-update-role-account-by-id.service';
import { IamUpdateRolesAccountsService } from './application/update/iam-update-roles-accounts.service';

export const IamRoleAccountHandlers = [
  // commands
  IamCreateRoleAccountCommandHandler,
  IamCreateRolesAccountsCommandHandler,
  IamUpdateRoleAccountByIdCommandHandler,
  IamUpdateRolesAccountsCommandHandler,
  IamDeleteRoleAccountByIdCommandHandler,
  IamDeleteRolesAccountsCommandHandler,

  // queries
  IamPaginateRolesAccountsQueryHandler,
  IamGetRolesAccountsQueryHandler,
  IamFindRoleAccountQueryHandler,
  IamFindRoleAccountByIdQueryHandler,

  // events
  IamCreatedRoleAccountEventHandler,
  IamCreatedRolesAccountsEventHandler,
  IamUpdatedRoleAccountEventHandler,
  IamUpdatedRolesAccountsEventHandler,
  IamDeletedRoleAccountEventHandler,
  IamDeletedRolesAccountsEventHandler,
];

export const IamRoleAccountServices = [
  IamCreateRoleAccountService,
  IamCreateRolesAccountsService,
  IamPaginateRolesAccountsService,
  IamGetRolesAccountsService,
  IamFindRoleAccountService,
  IamFindRoleAccountByIdService,
  IamUpdateRoleAccountByIdService,
  IamUpdateRolesAccountsService,
  IamDeleteRoleAccountByIdService,
  IamDeleteRolesAccountsService,
];
