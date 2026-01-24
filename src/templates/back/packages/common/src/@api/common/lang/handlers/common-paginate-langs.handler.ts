import { Pagination } from '@api/graphql';
import { CommonPaginateLangsQuery } from '@app/common/lang';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonPaginateLangsHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<Pagination> {
    return await this.queryBus.ask(
      new CommonPaginateLangsQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
