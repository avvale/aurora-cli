import { Pagination } from '@api/graphql';
import { ToolsPaginateWebhooksQuery } from '@app/tools/webhook';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsPaginateWebhooksHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<Pagination> {
    return await this.queryBus.ask(
      new ToolsPaginateWebhooksQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
