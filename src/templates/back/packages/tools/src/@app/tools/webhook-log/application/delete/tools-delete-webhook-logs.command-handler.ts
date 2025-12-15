import { ToolsDeleteWebhookLogsCommand } from '@app/tools/webhook-log';
import { ToolsDeleteWebhookLogsService } from '@app/tools/webhook-log/application/delete/tools-delete-webhook-logs.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsDeleteWebhookLogsCommand)
export class ToolsDeleteWebhookLogsCommandHandler
    implements ICommandHandler<ToolsDeleteWebhookLogsCommand>
{
    constructor(
        private readonly deleteWebhookLogsService: ToolsDeleteWebhookLogsService,
    ) {}

    async execute(command: ToolsDeleteWebhookLogsCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteWebhookLogsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
