import { CommonResourceDto } from '@api/common/resource';
import { CommonResource } from '@api/graphql';
import { CommonGetResourcesQuery } from '@app/common/resource';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonGetResourcesHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<CommonResource[] | CommonResourceDto[]> {
    return await this.queryBus.ask(
      new CommonGetResourcesQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
