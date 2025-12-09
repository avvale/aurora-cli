import { ToolsWebhook } from '@api/graphql';
import { ToolsWebhookDto } from '@api/tools/webhook';
import { ToolsFindWebhookQuery } from '@app/tools/webhook';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsFindWebhookHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<ToolsWebhook | ToolsWebhookDto> {
        return await this.queryBus.ask(
            new ToolsFindWebhookQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
