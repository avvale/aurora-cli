import { ToolsKeyValueType } from '@api/graphql';
import { createKeyValue, getKeyValue } from '@api/tools/key-value/shared';
import { uuid } from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Cache } from 'cache-manager';

export const WEBHOOK_ACTIVATE_LOGGER = 'WEBHOOK_ACTIVATE_LOGGER';

@Injectable()
export class ToolsWebhookKeyValueService {
    constructor(
        private readonly moduleRef: ModuleRef,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    async onApplicationBootstrap(): Promise<void> {
        const webhookLoggerKeyValue = await getKeyValue(
            this.moduleRef,
            WEBHOOK_ACTIVATE_LOGGER,
        );

        if (webhookLoggerKeyValue !== null) {
            await this.cacheManager.set(
                WEBHOOK_ACTIVATE_LOGGER,
                webhookLoggerKeyValue,
            );
        } else {
            void createKeyValue(this.moduleRef, {
                id: uuid(),
                key: WEBHOOK_ACTIVATE_LOGGER,
                type: ToolsKeyValueType.BOOLEAN,
                value: false,
                isCached: true,
                isActive: true,
                description: 'Activate or deactivate webhook logger',
            });
        }
    }
}
