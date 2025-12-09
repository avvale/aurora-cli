import { ToolsDeleteWebhookByIdCommand } from '@app/tools/webhook';
import { ToolsDeleteWebhookByIdService } from '@app/tools/webhook/application/delete/tools-delete-webhook-by-id.service';
import { ToolsWebhookId } from '@app/tools/webhook/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsDeleteWebhookByIdCommand)
export class ToolsDeleteWebhookByIdCommandHandler
    implements ICommandHandler<ToolsDeleteWebhookByIdCommand>
{
    constructor(
        private readonly deleteWebhookByIdService: ToolsDeleteWebhookByIdService,
    ) {}

    async execute(command: ToolsDeleteWebhookByIdCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteWebhookByIdService.main(
            new ToolsWebhookId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
