import { ToolsKeyValueType } from '@api/graphql';
import {
  ToolsFindKeyValueQuery,
  ToolsUpdateKeyValueByIdCommand,
} from '@app/tools/key-value';
import { Crypt, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ModuleRef } from '@nestjs/core';
import { Cache } from 'cache-manager';

export const setKeyValue = async (
  moduleRef: ModuleRef,
  key: string,
  value: any,
): Promise<void> => {
  const queryBus = moduleRef.get(IQueryBus, { strict: false });
  const commandBus = moduleRef.get(ICommandBus, { strict: false });
  const cacheManager = moduleRef.get<Cache>(CACHE_MANAGER, { strict: false });

  const keyValue = await queryBus.ask(
    new ToolsFindKeyValueQuery({ where: { key } }),
  );

  if (keyValue.isCached) await cacheManager.set(keyValue.key, value);

  if (keyValue.type === ToolsKeyValueType.SECRET)
    value = Crypt.encryptWithAuroraPublicKey(value as string);

  await commandBus.dispatch(
    new ToolsUpdateKeyValueByIdCommand({
      value,
      id: keyValue.id,
    }),
  );
};
