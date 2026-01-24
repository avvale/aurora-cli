import { IamTenantAccount } from '@api/graphql';
import { IamFindTenantAccountQuery } from '@app/iam/tenant-account';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamFindTenantAccountHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<IamTenantAccount> {
    const tenantAccount = await this.queryBus.ask(
      new IamFindTenantAccountQuery(queryStatement, constraint, {
        timezone,
      }),
    );

    if (!tenantAccount) {
      throw new NotFoundException(`IamTenantAccount not found`);
    }

    return tenantAccount;
  }
}
