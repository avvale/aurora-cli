/* eslint-disable key-spacing */
import { ToolsCreateWebhookCommand } from '@app/tools/webhook';
import { ToolsCreateWebhookService } from '@app/tools/webhook/application/create/tools-create-webhook.service';
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

@CommandHandler(ToolsCreateWebhookCommand)
export class ToolsCreateWebhookCommandHandler
    implements ICommandHandler<ToolsCreateWebhookCommand>
{
    constructor(
        private readonly createWebhookService: ToolsCreateWebhookService,
    ) {}

    async execute(command: ToolsCreateWebhookCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createWebhookService.main(
            {
                id: new ToolsWebhookId(command.payload.id),
                name: new ToolsWebhookName(command.payload.name),
                service: new ToolsWebhookService(command.payload.service),
                endpoint: new ToolsWebhookEndpoint(command.payload.endpoint),
                externalId: new ToolsWebhookExternalId(
                    command.payload.externalId,
                ),
                events: new ToolsWebhookEvents(command.payload.events),
                secret: new ToolsWebhookSecret(command.payload.secret),
                meta: new ToolsWebhookMeta(command.payload.meta),
            },
            command.cQMetadata,
        );
    }
}
