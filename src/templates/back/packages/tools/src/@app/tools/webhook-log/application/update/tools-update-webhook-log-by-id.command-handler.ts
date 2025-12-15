/* eslint-disable key-spacing */
import { ToolsUpdateWebhookLogByIdCommand } from '@app/tools/webhook-log';
import { ToolsUpdateWebhookLogByIdService } from '@app/tools/webhook-log/application/update/tools-update-webhook-log-by-id.service';
import {
    ToolsWebhookLogBodyRequest,
    ToolsWebhookLogHeaderRequest,
    ToolsWebhookLogId,
    ToolsWebhookLogUrl,
} from '@app/tools/webhook-log/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsUpdateWebhookLogByIdCommand)
export class ToolsUpdateWebhookLogByIdCommandHandler
    implements ICommandHandler<ToolsUpdateWebhookLogByIdCommand>
{
    constructor(
        private readonly updateWebhookLogByIdService: ToolsUpdateWebhookLogByIdService,
    ) {}

    async execute(command: ToolsUpdateWebhookLogByIdCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.updateWebhookLogByIdService.main(
            {
                id: new ToolsWebhookLogId(command.payload.id),
                url: new ToolsWebhookLogUrl(command.payload.url, {
                    undefinable: true,
                }),
                headerRequest: new ToolsWebhookLogHeaderRequest(
                    command.payload.headerRequest,
                ),
                bodyRequest: new ToolsWebhookLogBodyRequest(
                    command.payload.bodyRequest,
                ),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
