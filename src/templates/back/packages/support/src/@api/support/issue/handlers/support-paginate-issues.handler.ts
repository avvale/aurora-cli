import { Pagination } from '@api/graphql';
import { SupportPaginateIssuesQuery } from '@app/support/issue';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupportPaginateIssuesHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<Pagination> {
    return await this.queryBus.ask(
      new SupportPaginateIssuesQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
