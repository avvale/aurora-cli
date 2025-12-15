import {
    ToolsAddWebhookLogsContextEvent,
    ToolsIWebhookLogRepository,
} from '@app/tools/webhook-log';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ToolsDeleteWebhookLogsService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ToolsIWebhookLogRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // get objects to delete
        const webhookLogs = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (webhookLogs.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddWebhookLogsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const webhookLogsRegistered = this.publisher.mergeObjectContext(
            new ToolsAddWebhookLogsContextEvent(webhookLogs, cQMetadata),
        );

        webhookLogsRegistered.deleted(); // apply event to model events
        webhookLogsRegistered.commit(); // commit all events of model
    }
}
