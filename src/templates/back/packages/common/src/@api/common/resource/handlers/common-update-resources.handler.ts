import {
  CommonResourceDto,
  CommonUpdateResourcesDto,
} from '@api/common/resource';
import { CommonResource, CommonUpdateResourcesInput } from '@api/graphql';
import {
  CommonGetResourcesQuery,
  CommonUpdateResourcesCommand,
} from '@app/common/resource';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpdateResourcesHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: CommonUpdateResourcesInput | CommonUpdateResourcesDto,
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonResource | CommonResourceDto> {
    await this.commandBus.dispatch(
      new CommonUpdateResourcesCommand(payload, queryStatement, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return await this.queryBus.ask(
      new CommonGetResourcesQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
