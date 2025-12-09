import { ToolsWebhook } from '@api/graphql';
import { ToolsWebhookDto } from '@api/tools/webhook';
import { ToolsGetWebhooksQuery } from '@app/tools/webhook';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsGetWebhooksHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<ToolsWebhook[] | ToolsWebhookDto[]> {
        return await this.queryBus.ask(
            new ToolsGetWebhooksQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
