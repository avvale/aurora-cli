import { Pagination } from '@api/graphql';
import { OAuthPaginateAccessTokensQuery } from '@app/o-auth/access-token';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthPaginateAccessTokensHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<Pagination> {
    return await this.queryBus.ask(
      new OAuthPaginateAccessTokensQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
