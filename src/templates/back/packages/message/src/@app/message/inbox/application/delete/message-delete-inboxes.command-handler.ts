import { MessageDeleteInboxesCommand } from '@app/message/inbox';
import { MessageDeleteInboxesService } from '@app/message/inbox/application/delete/message-delete-inboxes.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MessageDeleteInboxesCommand)
export class MessageDeleteInboxesCommandHandler implements ICommandHandler<MessageDeleteInboxesCommand>
{
    constructor(
        private readonly deleteInboxesService: MessageDeleteInboxesService,
    ) {}

    async execute(command: MessageDeleteInboxesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteInboxesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
