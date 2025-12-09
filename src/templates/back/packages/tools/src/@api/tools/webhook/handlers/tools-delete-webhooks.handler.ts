import { ToolsWebhook } from '@api/graphql';
import { ToolsWebhookDto } from '@api/tools/webhook';
import {
    ToolsDeleteWebhooksCommand,
    ToolsGetWebhooksQuery,
} from '@app/tools/webhook';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsDeleteWebhooksHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<ToolsWebhook[] | ToolsWebhookDto[]> {
        const webhooks = await this.queryBus.ask(
            new ToolsGetWebhooksQuery(queryStatement, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new ToolsDeleteWebhooksCommand(queryStatement, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return webhooks;
    }
}
