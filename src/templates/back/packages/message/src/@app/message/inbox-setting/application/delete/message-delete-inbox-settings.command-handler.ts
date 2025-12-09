import { MessageDeleteInboxSettingsCommand } from '@app/message/inbox-setting';
import { MessageDeleteInboxSettingsService } from '@app/message/inbox-setting/application/delete/message-delete-inbox-settings.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MessageDeleteInboxSettingsCommand)
export class MessageDeleteInboxSettingsCommandHandler
    implements ICommandHandler<MessageDeleteInboxSettingsCommand>
{
    constructor(
        private readonly deleteInboxSettingsService: MessageDeleteInboxSettingsService,
    ) {}

    async execute(command: MessageDeleteInboxSettingsCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteInboxSettingsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
