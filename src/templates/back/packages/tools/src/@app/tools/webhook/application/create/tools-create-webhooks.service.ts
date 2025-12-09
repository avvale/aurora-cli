import {
    ToolsAddWebhooksContextEvent,
    ToolsIWebhookRepository,
    ToolsWebhook,
} from '@app/tools/webhook';
import {
    ToolsWebhookCreatedAt,
    ToolsWebhookEndpoint,
    ToolsWebhookEvents,
    ToolsWebhookExternalId,
    ToolsWebhookId,
    ToolsWebhookMeta,
    ToolsWebhookName,
    ToolsWebhookSecret,
    ToolsWebhookService,
    ToolsWebhookUpdatedAt,
} from '@app/tools/webhook/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ToolsCreateWebhooksService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ToolsIWebhookRepository,
    ) {}

    async main(
        payload: {
            id: ToolsWebhookId;
            name: ToolsWebhookName;
            service: ToolsWebhookService;
            endpoint: ToolsWebhookEndpoint;
            externalId: ToolsWebhookExternalId;
            events: ToolsWebhookEvents;
            secret: ToolsWebhookSecret;
            meta: ToolsWebhookMeta;
        }[],
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const webhooks = payload.map((webhook) =>
            ToolsWebhook.register(
                webhook.id,
                undefined, // rowId
                webhook.name,
                webhook.service,
                webhook.endpoint,
                webhook.externalId,
                webhook.events,
                webhook.secret,
                webhook.meta,
                new ToolsWebhookCreatedAt({ currentTimestamp: true }),
                new ToolsWebhookUpdatedAt({ currentTimestamp: true }),
                null, // deleteAt
            ),
        );

        // insert
        await this.repository.insert(webhooks, {
            insertOptions: cQMetadata?.repositoryOptions,
        });

        // create AddWebhooksContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const webhooksRegistered = this.publisher.mergeObjectContext(
            new ToolsAddWebhooksContextEvent(webhooks, cQMetadata),
        );

        webhooksRegistered.created(); // apply event to model events
        webhooksRegistered.commit(); // commit all events of model
    }
}
