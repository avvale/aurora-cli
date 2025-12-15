import { ToolsCreateWebhookLogInput, ToolsWebhookLog } from '@api/graphql';
import {
    ToolsCreateWebhookLogCommand,
    ToolsFindWebhookLogByIdQuery,
} from '@app/tools/webhook-log';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsCreateWebhookLogHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: ToolsCreateWebhookLogInput,
        timezone?: string,
    ): Promise<ToolsWebhookLog> {
        await this.commandBus.dispatch(
            new ToolsCreateWebhookLogCommand(payload, {
                timezone,
            }),
        );

        return await this.queryBus.ask(
            new ToolsFindWebhookLogByIdQuery(
                payload.id,
                {},
                {
                    timezone,
                },
            ),
        );
    }
}
