/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { CommonResource } from '@api/graphql';
import { CommonFindResourceByIdQuery } from '@app/common/resource';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CommonFindResourceByIdHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<CommonResource> {
    const resource = await this.queryBus.ask(
      new CommonFindResourceByIdQuery(id, constraint, {
        timezone,
      }),
    );

    if (!resource) {
      throw new NotFoundException(`CommonResource with id: ${id}, not found`);
    }

    return resource;
  }
}
