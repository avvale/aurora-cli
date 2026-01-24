import { IamTenantAccount } from '@api/graphql';
import {
  IamDeleteTenantsAccountsCommand,
  IamGetTenantsAccountsQuery,
} from '@app/iam/tenant-account';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamDeleteTenantsAccountsHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<IamTenantAccount[]> {
    const tenantsAccounts = await this.queryBus.ask(
      new IamGetTenantsAccountsQuery(queryStatement, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new IamDeleteTenantsAccountsCommand(queryStatement, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return tenantsAccounts;
  }
}
