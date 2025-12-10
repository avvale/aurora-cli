import { ToolsCreateKeyValueInput } from '@api/graphql';
import { ToolsCreateKeyValueDto } from '@api/tools/key-value';
import { ToolsCreateKeyValuesCommand } from '@app/tools/key-value';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class ToolsCreateKeyValuesHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    async main(
        payload: ToolsCreateKeyValueInput[] | ToolsCreateKeyValueDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean> {
        await this.commandBus.dispatch(
            new ToolsCreateKeyValuesCommand(payload, {
                timezone,
                repositoryOptions: {
                    auditing,
                    updateOnDuplicate: ['value'],
                    conflictAttributes: ['id'],
                },
            }),
        );

        for (const item of payload) {
            if (item.isCached)
                await this.cacheManager.set(item.key, item.value);
        }

        return true;
    }
}
