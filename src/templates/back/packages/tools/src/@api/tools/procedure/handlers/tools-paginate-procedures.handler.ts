import { Pagination } from '@api/graphql';
import { ToolsPaginateProceduresQuery } from '@app/tools/procedure';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsPaginateProceduresHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<Pagination> {
    return await this.queryBus.ask(
      new ToolsPaginateProceduresQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
