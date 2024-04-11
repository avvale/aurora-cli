import { MessageDeleteInboxByIdCommand } from '@app/message/inbox';
import { MessageDeleteInboxByIdService } from '@app/message/inbox/application/delete/message-delete-inbox-by-id.service';
import { MessageInboxId } from '@app/message/inbox/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MessageDeleteInboxByIdCommand)
export class MessageDeleteInboxByIdCommandHandler implements ICommandHandler<MessageDeleteInboxByIdCommand>
{
    constructor(
        private readonly deleteInboxByIdService: MessageDeleteInboxByIdService,
    ) {}

    async execute(command: MessageDeleteInboxByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteInboxByIdService.main(
            new MessageInboxId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
