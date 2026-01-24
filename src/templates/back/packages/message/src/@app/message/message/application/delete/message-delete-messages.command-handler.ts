import { MessageDeleteMessagesCommand } from '@app/message/message';
import { MessageDeleteMessagesService } from '@app/message/message/application/delete/message-delete-messages.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MessageDeleteMessagesCommand)
export class MessageDeleteMessagesCommandHandler
  implements ICommandHandler<MessageDeleteMessagesCommand>
{
  constructor(
    private readonly deleteMessagesService: MessageDeleteMessagesService,
  ) {}

  async execute(command: MessageDeleteMessagesCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteMessagesService.main(
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
