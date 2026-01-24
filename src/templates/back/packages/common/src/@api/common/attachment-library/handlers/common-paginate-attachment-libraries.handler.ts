import { Pagination } from '@api/graphql';
import { CommonPaginateAttachmentLibrariesQuery } from '@app/common/attachment-library';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonPaginateAttachmentLibrariesHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<Pagination> {
    return await this.queryBus.ask(
      new CommonPaginateAttachmentLibrariesQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
