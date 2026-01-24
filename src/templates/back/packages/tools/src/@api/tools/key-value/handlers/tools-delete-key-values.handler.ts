import { ToolsKeyValue } from '@api/graphql';
import {
  ToolsDeleteKeyValuesCommand,
  ToolsGetKeyValuesQuery,
} from '@app/tools/key-value';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class ToolsDeleteKeyValuesHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<ToolsKeyValue[]> {
    const keyValues = await this.queryBus.ask(
      new ToolsGetKeyValuesQuery(queryStatement, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new ToolsDeleteKeyValuesCommand(queryStatement, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    for (const keyValue of keyValues) {
      if (keyValue.isCached) void this.cacheManager.del(keyValue.key);
    }

    return keyValues;
  }
}
