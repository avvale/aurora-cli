import { Pagination } from '@api/graphql';
import { CommonPaginateAttachmentFamiliesQuery } from '@app/common/attachment-family';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonPaginateAttachmentFamiliesHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<Pagination> {
    return await this.queryBus.ask(
      new CommonPaginateAttachmentFamiliesQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
