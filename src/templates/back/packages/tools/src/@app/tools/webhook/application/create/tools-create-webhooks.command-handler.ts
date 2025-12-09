/* eslint-disable key-spacing */
import { ToolsCreateWebhooksCommand } from '@app/tools/webhook';
import { ToolsCreateWebhooksService } from '@app/tools/webhook/application/create/tools-create-webhooks.service';
import {
    ToolsWebhookEndpoint,
    ToolsWebhookEvents,
    ToolsWebhookExternalId,
    ToolsWebhookId,
    ToolsWebhookMeta,
    ToolsWebhookName,
    ToolsWebhookSecret,
    ToolsWebhookService,
} from '@app/tools/webhook/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsCreateWebhooksCommand)
export class ToolsCreateWebhooksCommandHandler
    implements ICommandHandler<ToolsCreateWebhooksCommand>
{
    constructor(
        private readonly createWebhooksService: ToolsCreateWebhooksService,
    ) {}

    async execute(command: ToolsCreateWebhooksCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createWebhooksService.main(
            command.payload.map((webhook) => {
                return {
                    id: new ToolsWebhookId(webhook.id),
                    name: new ToolsWebhookName(webhook.name),
                    service: new ToolsWebhookService(webhook.service),
                    endpoint: new ToolsWebhookEndpoint(webhook.endpoint),
                    externalId: new ToolsWebhookExternalId(webhook.externalId),
                    events: new ToolsWebhookEvents(webhook.events),
                    secret: new ToolsWebhookSecret(webhook.secret),
                    meta: new ToolsWebhookMeta(webhook.meta),
                };
            }),
            command.cQMetadata,
        );
    }
}
