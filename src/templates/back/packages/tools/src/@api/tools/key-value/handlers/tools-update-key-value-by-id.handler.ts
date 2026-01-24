import {
  ToolsKeyValue,
  ToolsKeyValueType,
  ToolsUpdateKeyValueByIdInput,
} from '@api/graphql';
import {
  ToolsFindKeyValueByIdQuery,
  ToolsUpdateKeyValueByIdCommand,
} from '@app/tools/key-value';
import {
  AuditingMeta,
  Crypt,
  diff,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class ToolsUpdateKeyValueByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async main(
    payload: ToolsUpdateKeyValueByIdInput,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<ToolsKeyValue> {
    const keyValue = await this.queryBus.ask(
      new ToolsFindKeyValueByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );

    if (!keyValue) {
      throw new NotFoundException(
        `ToolsKeyValue with id: ${payload.id}, not found`,
      );
    }

    const dataToUpdate = diff(payload, keyValue);

    if ('value' in dataToUpdate) {
      if (payload.type === ToolsKeyValueType.SECRET)
        dataToUpdate.value = Crypt.encryptWithAuroraPublicKey(
          dataToUpdate.value,
        );
      if (payload.type === ToolsKeyValueType.BOOLEAN)
        dataToUpdate.value = dataToUpdate.value === 'true';
    }

    if ('type' in dataToUpdate) {
      if (dataToUpdate.type === ToolsKeyValueType.SECRET) {
        dataToUpdate.value = Crypt.encryptWithAuroraPublicKey(keyValue.value);
      } else if (keyValue.type === ToolsKeyValueType.SECRET) {
        dataToUpdate.value = Crypt.decryptWithAuroraPrivateKey(keyValue.value);
      }
    }

    await this.commandBus.dispatch(
      new ToolsUpdateKeyValueByIdCommand(
        {
          ...dataToUpdate,
          id: payload.id,
        },
        constraint,
        {
          timezone,
          repositoryOptions: {
            auditing,
          },
        },
      ),
    );

    const keyValueUpdated = await this.queryBus.ask<
      ToolsFindKeyValueByIdQuery,
      ToolsKeyValue
    >(
      new ToolsFindKeyValueByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );

    if (keyValueUpdated.type === ToolsKeyValueType.SECRET) {
      keyValueUpdated.value = Crypt.decryptWithAuroraPrivateKey(
        keyValueUpdated.value,
      );
    }

    if (keyValueUpdated.isCached) {
      await this.cacheManager.set(keyValueUpdated.key, keyValueUpdated.value);
    } else if (payload.isCached === false) {
      await this.cacheManager.del(keyValueUpdated.key);
    }

    return keyValueUpdated;
  }
}
