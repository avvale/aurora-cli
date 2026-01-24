import { ToolsKeyValue, ToolsKeyValueType } from '@api/graphql';
import { ToolsFindKeyValueByIdQuery } from '@app/tools/key-value';
import { Crypt, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ToolsFindKeyValueByIdHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<ToolsKeyValue> {
    const keyValue = await this.queryBus.ask(
      new ToolsFindKeyValueByIdQuery(id, constraint, {
        timezone,
      }),
    );

    if (!keyValue) {
      throw new NotFoundException(`ToolsKeyValue with id: ${id}, not found`);
    }

    if (keyValue.type === ToolsKeyValueType.SECRET)
      keyValue.value = Crypt.decryptWithAuroraPrivateKey(keyValue.value);

    return keyValue;
  }
}
