import { WhatsappDeleteMessageByIdCommand } from '@app/whatsapp/message';
import { WhatsappDeleteMessageByIdService } from '@app/whatsapp/message/application/delete/whatsapp-delete-message-by-id.service';
import { WhatsappMessageId } from '@app/whatsapp/message/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappDeleteMessageByIdCommand)
export class WhatsappDeleteMessageByIdCommandHandler
  implements ICommandHandler<WhatsappDeleteMessageByIdCommand>
{
  constructor(
    private readonly deleteMessageByIdService: WhatsappDeleteMessageByIdService,
  ) {}

  async execute(command: WhatsappDeleteMessageByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteMessageByIdService.main(
      new WhatsappMessageId(command.id),
      command.constraint,
      command.cQMetadata,
    );
  }
}
