import { ToolsCreateKeyValueInput, ToolsKeyValueType } from '@api/graphql';
import { ToolsCreateKeyValueCommand } from '@app/tools/key-value';
import { AuditingMeta, Crypt, ICommandBus } from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ModuleRef } from '@nestjs/core';
import { Cache } from 'cache-manager';

export const createKeyValue = async (
  moduleRef: ModuleRef,
  payload: ToolsCreateKeyValueInput,
  timezone?: string,
  auditing?: AuditingMeta,
): Promise<void> => {
  const commandBus = moduleRef.get(ICommandBus, { strict: false });
  const cacheManager = moduleRef.get<Cache>(CACHE_MANAGER, { strict: false });

  if (payload.isCached) void cacheManager.set(payload.key, payload.value);

  if (payload.type === ToolsKeyValueType.SECRET)
    payload.value = Crypt.encryptWithAuroraPublicKey(payload.value);

  await commandBus.dispatch(
    new ToolsCreateKeyValueCommand(payload, {
      timezone,
      repositoryOptions: {
        auditing,
      },
    }),
  );
};
