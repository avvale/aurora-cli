/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { Pagination } from '@api/graphql';
import { IamPaginateBoundedContextsQuery } from '@app/iam/bounded-context';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamPaginateBoundedContextsHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<Pagination> {
    return await this.queryBus.ask(
      new IamPaginateBoundedContextsQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
