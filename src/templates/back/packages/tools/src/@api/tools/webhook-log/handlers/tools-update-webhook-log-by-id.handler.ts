import { ToolsUpdateWebhookLogByIdInput, ToolsWebhookLog } from '@api/graphql';
import {
    ToolsFindWebhookLogByIdQuery,
    ToolsUpdateWebhookLogByIdCommand,
} from '@app/tools/webhook-log';
import {
    diff,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ToolsUpdateWebhookLogByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: ToolsUpdateWebhookLogByIdInput,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<ToolsWebhookLog> {
        const webhookLog = await this.queryBus.ask(
            new ToolsFindWebhookLogByIdQuery(payload.id, constraint, {
                timezone,
            }),
        );

        if (!webhookLog) {
            throw new NotFoundException(
                `ToolsWebhookLog with id: ${payload.id}, not found`,
            );
        }

        const dataToUpdate = diff(payload, webhookLog);

        await this.commandBus.dispatch(
            new ToolsUpdateWebhookLogByIdCommand(
                {
                    ...dataToUpdate,
                    id: payload.id,
                },
                constraint,
                {
                    timezone,
                },
            ),
        );

        return await this.queryBus.ask(
            new ToolsFindWebhookLogByIdQuery(payload.id, constraint, {
                timezone,
            }),
        );
    }
}
