import { ToolsWebhookLog } from '@api/graphql';
import { ToolsFindWebhookLogByIdQuery } from '@app/tools/webhook-log';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ToolsFindWebhookLogByIdHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<ToolsWebhookLog> {
        const webhookLog = await this.queryBus.ask(
            new ToolsFindWebhookLogByIdQuery(id, constraint, {
                timezone,
            }),
        );

        if (!webhookLog) {
            throw new NotFoundException(
                `ToolsWebhookLog with id: ${id}, not found`,
            );
        }

        return webhookLog;
    }
}
