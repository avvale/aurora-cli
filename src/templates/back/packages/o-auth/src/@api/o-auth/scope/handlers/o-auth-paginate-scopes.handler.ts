import { Pagination } from '@api/graphql';
import { OAuthPaginateScopesQuery } from '@app/o-auth/scope';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthPaginateScopesHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<Pagination> {
    return await this.queryBus.ask(
      new OAuthPaginateScopesQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
