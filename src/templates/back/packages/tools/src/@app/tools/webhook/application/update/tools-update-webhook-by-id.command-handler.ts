/* eslint-disable key-spacing */
import { ToolsUpdateWebhookByIdCommand } from '@app/tools/webhook';
import { ToolsUpdateWebhookByIdService } from '@app/tools/webhook/application/update/tools-update-webhook-by-id.service';
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

@CommandHandler(ToolsUpdateWebhookByIdCommand)
export class ToolsUpdateWebhookByIdCommandHandler
    implements ICommandHandler<ToolsUpdateWebhookByIdCommand>
{
    constructor(
        private readonly updateWebhookByIdService: ToolsUpdateWebhookByIdService,
    ) {}

    async execute(command: ToolsUpdateWebhookByIdCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.updateWebhookByIdService.main(
            {
                id: new ToolsWebhookId(command.payload.id),
                name: new ToolsWebhookName(command.payload.name, {
                    undefinable: true,
                }),
                service: new ToolsWebhookService(command.payload.service, {
                    undefinable: true,
                }),
                endpoint: new ToolsWebhookEndpoint(command.payload.endpoint, {
                    undefinable: true,
                }),
                externalId: new ToolsWebhookExternalId(
                    command.payload.externalId,
                ),
                events: new ToolsWebhookEvents(command.payload.events),
                secret: new ToolsWebhookSecret(command.payload.secret),
                meta: new ToolsWebhookMeta(command.payload.meta),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
