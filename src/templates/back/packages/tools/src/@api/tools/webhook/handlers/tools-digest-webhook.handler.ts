import { ToolsDigestWebhookCommand } from '@app/tools/webhook';
import { ToolsCreateWebhookLogCommand } from '@app/tools/webhook-log';
import { ICommandBus, uuid } from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { WEBHOOK_ACTIVATE_LOGGER } from '../shared';

@Injectable()
export class ToolsDigestWebhookHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    async main(request: Request, headers: any, payload: any): Promise<boolean> {
        if (await this.cacheManager.get(WEBHOOK_ACTIVATE_LOGGER)) {
            await this.commandBus.dispatch(
                new ToolsCreateWebhookLogCommand({
                    id: uuid(),
                    url: `${request.protocol}://${request.host}${request.originalUrl}`,
                    headerRequest: headers,
                    bodyRequest: payload,
                }),
            );
        }

        await this.commandBus.dispatch(
            new ToolsDigestWebhookCommand(headers, payload),
        );

        return true;
    }
}
