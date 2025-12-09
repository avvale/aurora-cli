import {
    CLICKUP_TASK_PLATFORM_API_KEY,
    CLICKUP_TASK_PLATFORM_WEBHOOK_ID,
    ClickupService,
} from '@api/support/clickup/shared';
import { setKeyValue } from '@api/tools/shared';
import {
    ToolsDeleteWebhookByIdCommand,
    ToolsFindWebhookQuery,
} from '@app/tools/webhook';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SupportDeleteWebhookConfigHandler {
    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly clickupService: ClickupService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    async main(timezone?: string, auditing?: AuditingMeta): Promise<boolean> {
        const supportTaskPlatformApiKey = await this.cacheManager.get<string>(
            CLICKUP_TASK_PLATFORM_API_KEY,
        );

        const supportTaskPlatformWebhookId =
            await this.cacheManager.get<string>(
                CLICKUP_TASK_PLATFORM_WEBHOOK_ID,
            );

        // delete webhook in clickup
        await lastValueFrom(
            this.clickupService.deleteWebhook(supportTaskPlatformWebhookId, {
                authorization: supportTaskPlatformApiKey,
            }),
        );

        // delete webhook in database
        const webhook = await this.queryBus.ask(
            new ToolsFindWebhookQuery({
                where: {
                    externalId: supportTaskPlatformWebhookId,
                },
            }),
        );

        await this.commandBus.dispatch(
            new ToolsDeleteWebhookByIdCommand(
                webhook.id,
                {},
                {
                    timezone,
                    repositoryOptions: {
                        auditing,
                    },
                },
            ),
        );

        // delete webhook in cache
        await this.cacheManager.set(CLICKUP_TASK_PLATFORM_WEBHOOK_ID, '');

        // delete webhook value in keyvalue
        await setKeyValue(this.moduleRef, CLICKUP_TASK_PLATFORM_WEBHOOK_ID, '');

        return true;
    }
}
