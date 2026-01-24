import { Pagination } from '@api/graphql';
import { IamPaginateTagsQuery } from '@app/iam/tag';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamPaginateTagsHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<Pagination> {
    return await this.queryBus.ask(
      new IamPaginateTagsQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
