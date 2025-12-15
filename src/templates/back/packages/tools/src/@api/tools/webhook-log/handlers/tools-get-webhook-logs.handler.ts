import { ToolsWebhookLog } from '@api/graphql';
import { ToolsGetWebhookLogsQuery } from '@app/tools/webhook-log';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsGetWebhookLogsHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<ToolsWebhookLog[]> {
        return await this.queryBus.ask(
            new ToolsGetWebhookLogsQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
