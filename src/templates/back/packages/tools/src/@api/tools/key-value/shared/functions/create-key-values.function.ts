import { ToolsCreateKeyValueInput, ToolsKeyValueType } from '@api/graphql';
import { ToolsCreateKeyValuesCommand } from '@app/tools/key-value';
import { AuditingMeta, Crypt, ICommandBus } from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ModuleRef } from '@nestjs/core';
import { Cache } from 'cache-manager';

export const createKeyValues = async (
    moduleRef: ModuleRef,
    payload: ToolsCreateKeyValueInput[],
    timezone?: string,
    auditing?: AuditingMeta,
): Promise<void> => {
    const commandBus = moduleRef.get(ICommandBus, { strict: false });
    const cacheManager = moduleRef.get<Cache>(CACHE_MANAGER, { strict: false });

    for (const item of payload) {
        if (item.isCached) void cacheManager.set(item.key, item.value);

        if (item.type === ToolsKeyValueType.SECRET)
            item.value = Crypt.encryptWithAuroraPublicKey(item.value);
    }

    await commandBus.dispatch(
        new ToolsCreateKeyValuesCommand(payload, {
            timezone,
            repositoryOptions: {
                auditing,
                updateOnDuplicate: ['value'],
                conflictAttributes: ['id'],
            },
        }),
    );
};
