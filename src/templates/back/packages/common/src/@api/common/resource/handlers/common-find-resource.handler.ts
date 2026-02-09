/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { CommonResource } from '@api/graphql';
import { CommonFindResourceQuery } from '@app/common/resource';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CommonFindResourceHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<CommonResource> {
    const resource = await this.queryBus.ask(
      new CommonFindResourceQuery(queryStatement, constraint, {
        timezone,
      }),
    );

    if (!resource) {
      throw new NotFoundException(`CommonResource not found`);
    }

    return resource;
  }
}
