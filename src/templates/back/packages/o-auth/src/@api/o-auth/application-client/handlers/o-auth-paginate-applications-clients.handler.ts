import { Pagination } from '@api/graphql';
import { OAuthPaginateApplicationsClientsQuery } from '@app/o-auth/application-client';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthPaginateApplicationsClientsHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<Pagination> {
    return await this.queryBus.ask(
      new OAuthPaginateApplicationsClientsQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
