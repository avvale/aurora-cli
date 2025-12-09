import { ToolsIWebhookRepository, ToolsWebhook } from '@app/tools/webhook';
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
export class ToolsCreateWebhookService {
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
        },
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const webhook = ToolsWebhook.register(
            payload.id,
            undefined, // rowId
            payload.name,
            payload.service,
            payload.endpoint,
            payload.externalId,
            payload.events,
            payload.secret,
            payload.meta,
            new ToolsWebhookCreatedAt({ currentTimestamp: true }),
            new ToolsWebhookUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(webhook, {
            createOptions: cQMetadata?.repositoryOptions,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const webhookRegister = this.publisher.mergeObjectContext(webhook);

        webhookRegister.created({
            payload: webhook,
            cQMetadata,
        }); // apply event to model events
        webhookRegister.commit(); // commit all events of model
    }
}
