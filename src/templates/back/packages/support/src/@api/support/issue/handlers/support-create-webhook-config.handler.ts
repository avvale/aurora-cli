import { ToolsWebhook } from '@api/graphql';
import {
    CLICKUP_TASK_PLATFORM_API_KEY,
    CLICKUP_TASK_PLATFORM_FOLDER_ID,
    CLICKUP_TASK_PLATFORM_LIST_ID,
    CLICKUP_TASK_PLATFORM_SPACE_ID,
    CLICKUP_TASK_PLATFORM_TEAM_ID,
    CLICKUP_TASK_PLATFORM_WEBHOOK_ID,
    ClickupService,
} from '@api/support/clickup/shared';
import { setKeyValue } from '@api/tools/shared';
import {
    ToolsCreateWebhookCommand,
    ToolsFindWebhookByIdQuery,
} from '@app/tools/webhook';
import { AuditingMeta, ICommandBus, IQueryBus, uuid } from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SupportCreateWebhookConfigHandler {
    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly configService: ConfigService,
        private readonly clickupService: ClickupService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    async main(
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<ToolsWebhook> {
        const supportTaskPlatformApiKey = await this.cacheManager.get<string>(
            CLICKUP_TASK_PLATFORM_API_KEY,
        );

        const supportTaskPlatformTeamId = await this.cacheManager.get<string>(
            CLICKUP_TASK_PLATFORM_TEAM_ID,
        );

        const supportTaskPlatformSpaceId = await this.cacheManager.get<string>(
            CLICKUP_TASK_PLATFORM_SPACE_ID,
        );

        const supportTaskPlatformFolderId = await this.cacheManager.get<string>(
            CLICKUP_TASK_PLATFORM_FOLDER_ID,
        );

        const supportTaskPlatformListId = await this.cacheManager.get<string>(
            CLICKUP_TASK_PLATFORM_LIST_ID,
        );

        const events = [
            'taskUpdated',
            'taskDeleted',
            'taskPriorityUpdated',
            'taskStatusUpdated',
            'taskDueDateUpdated',
            'taskCommentPosted',
            'taskCommentUpdated',
            'taskTimeEstimateUpdated',
        ];

        const endpoint = `${this.configService.get('APP_URL')}/tools/webhook/digest`;

        const webhookResponse = await lastValueFrom(
            this.clickupService.createWebhook(
                supportTaskPlatformTeamId,
                {
                    endpoint,
                    events,
                    spaceId: +supportTaskPlatformSpaceId,
                    folderId: +supportTaskPlatformFolderId,
                    listId: +supportTaskPlatformListId,
                },
                {
                    authorization: supportTaskPlatformApiKey,
                },
            ),
        );

        const webhookId = uuid();
        await this.commandBus.dispatch(
            new ToolsCreateWebhookCommand(
                {
                    id: webhookId,
                    name: 'Support ClickUp Webhook Subscription',
                    service: 'clickup',
                    endpoint,
                    externalId: webhookResponse.webhook.id,
                    events,
                    secret: webhookResponse.webhook.secret,
                    meta: webhookResponse,
                },
                {
                    timezone,
                    repositoryOptions: {
                        auditing,
                    },
                },
            ),
        );

        // set webhook value in keyvalue
        await setKeyValue(
            this.moduleRef,
            CLICKUP_TASK_PLATFORM_WEBHOOK_ID,
            webhookResponse.webhook.id,
        );

        // set webhook in cache
        await this.cacheManager.set(
            CLICKUP_TASK_PLATFORM_WEBHOOK_ID,
            webhookResponse.webhook.id,
        );

        return await this.queryBus.ask(
            new ToolsFindWebhookByIdQuery(webhookId),
        );
    }
}
