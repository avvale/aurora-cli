import { ToolsKeyValue, ToolsKeyValueType } from '@api/graphql';
import { ToolsFindKeyValueQuery } from '@app/tools/key-value';
import { Crypt, IQueryBus } from '@aurorajs.dev/core';
import { ModuleRef } from '@nestjs/core';

export const getKeyValue = async <
  T = string | boolean | number | Array<any> | object,
>(
  moduleRef: ModuleRef,
  key: string,
): Promise<T> => {
  const queryBus = moduleRef.get(IQueryBus, { strict: false });

  const keyValue: ToolsKeyValue = await queryBus.ask(
    new ToolsFindKeyValueQuery({ where: { key } }),
  );

  if (!keyValue) return null;

  if (keyValue.type === ToolsKeyValueType.SECRET)
    keyValue.value = Crypt.decryptWithAuroraPrivateKey(
      keyValue.value as string,
    );

  switch (keyValue.type) {
    case ToolsKeyValueType.STRING:
      return keyValue.value as T;

    case ToolsKeyValueType.BOOLEAN:
      return (keyValue.value === 'true') as T;

    case ToolsKeyValueType.NUMBER:
      return Number(keyValue.value) as T;

    case ToolsKeyValueType.ARRAY:
    case ToolsKeyValueType.OBJECT:
      return JSON.parse(keyValue.value) as T;
  }
};
