import { MessageDeleteOutboxByIdCommand } from '@app/message/outbox';
import { MessageDeleteOutboxByIdService } from '@app/message/outbox/application/delete/message-delete-outbox-by-id.service';
import { MessageOutboxId } from '@app/message/outbox/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(MessageDeleteOutboxByIdCommand)
export class MessageDeleteOutboxByIdCommandHandler
  implements ICommandHandler<MessageDeleteOutboxByIdCommand>
{
  constructor(
    private readonly deleteOutboxByIdService: MessageDeleteOutboxByIdService,
  ) {}

  async execute(command: MessageDeleteOutboxByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteOutboxByIdService.main(
      new MessageOutboxId(command.id),
      command.constraint,
      command.cQMetadata,
    );
  }
}
