import { ToolsWebhookLog } from '@api/graphql';
import {
    ToolsDeleteWebhookLogsCommand,
    ToolsGetWebhookLogsQuery,
} from '@app/tools/webhook-log';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsDeleteWebhookLogsHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<ToolsWebhookLog[]> {
        const webhookLogs = await this.queryBus.ask(
            new ToolsGetWebhookLogsQuery(queryStatement, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new ToolsDeleteWebhookLogsCommand(queryStatement, constraint, {
                timezone,
            }),
        );

        return webhookLogs;
    }
}
