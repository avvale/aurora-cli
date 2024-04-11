import { MessageDeleteMessageByIdCommand } from '@app/message/message';
import { MessageDeleteMessageByIdService } from '@app/message/message/application/delete/message-delete-message-by-id.service';
import { MessageMessageId } from '@app/message/message/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MessageDeleteMessageByIdCommand)
export class MessageDeleteMessageByIdCommandHandler implements ICommandHandler<MessageDeleteMessageByIdCommand>
{
    constructor(
        private readonly deleteMessageByIdService: MessageDeleteMessageByIdService,
    ) {}

    async execute(command: MessageDeleteMessageByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteMessageByIdService.main(
            new MessageMessageId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
