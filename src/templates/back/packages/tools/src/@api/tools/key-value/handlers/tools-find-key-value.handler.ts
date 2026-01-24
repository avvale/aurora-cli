import { ToolsKeyValue, ToolsKeyValueType } from '@api/graphql';
import { ToolsFindKeyValueQuery } from '@app/tools/key-value';
import { Crypt, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ToolsFindKeyValueHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<ToolsKeyValue> {
    const keyValue = await this.queryBus.ask(
      new ToolsFindKeyValueQuery(queryStatement, constraint, {
        timezone,
      }),
    );

    if (!keyValue) {
      throw new NotFoundException(`ToolsKeyValue not found`);
    }

    if (keyValue.type === ToolsKeyValueType.SECRET)
      keyValue.value = Crypt.decryptWithAuroraPrivateKey(keyValue.value);

    return keyValue;
  }
}
