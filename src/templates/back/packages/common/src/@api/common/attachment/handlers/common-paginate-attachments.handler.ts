import { Pagination } from '@api/graphql';
import { CommonPaginateAttachmentsQuery } from '@app/common/attachment';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonPaginateAttachmentsHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<Pagination> {
    return await this.queryBus.ask(
      new CommonPaginateAttachmentsQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
