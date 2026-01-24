import { MessageDeleteOutboxesCommand } from '@app/message/outbox';
import { MessageDeleteOutboxesService } from '@app/message/outbox/application/delete/message-delete-outboxes.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MessageDeleteOutboxesCommand)
export class MessageDeleteOutboxesCommandHandler
  implements ICommandHandler<MessageDeleteOutboxesCommand>
{
  constructor(
    private readonly deleteOutboxesService: MessageDeleteOutboxesService,
  ) {}

  async execute(command: MessageDeleteOutboxesCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteOutboxesService.main(
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
