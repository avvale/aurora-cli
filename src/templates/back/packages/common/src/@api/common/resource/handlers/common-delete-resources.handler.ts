import { CommonResourceDto } from '@api/common/resource';
import { CommonResource } from '@api/graphql';
import {
  CommonDeleteResourcesCommand,
  CommonGetResourcesQuery,
} from '@app/common/resource';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonDeleteResourcesHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonResource[] | CommonResourceDto[]> {
    const resources = await this.queryBus.ask(
      new CommonGetResourcesQuery(queryStatement, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new CommonDeleteResourcesCommand(queryStatement, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return resources;
  }
}
