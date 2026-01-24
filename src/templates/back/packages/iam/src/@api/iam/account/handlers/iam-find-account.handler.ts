import { IamAccount } from '@api/graphql';
import { IamFindAccountQuery } from '@app/iam/account';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamFindAccountHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<IamAccount> {
    const account = await this.queryBus.ask(
      new IamFindAccountQuery(queryStatement, constraint, {
        timezone,
      }),
    );

    if (!account) {
      throw new NotFoundException(`IamAccount not found`);
    }

    return account;
  }
}
