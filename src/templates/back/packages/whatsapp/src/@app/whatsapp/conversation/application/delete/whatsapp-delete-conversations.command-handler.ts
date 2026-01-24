import { WhatsappDeleteConversationsCommand } from '@app/whatsapp/conversation';
import { WhatsappDeleteConversationsService } from '@app/whatsapp/conversation/application/delete/whatsapp-delete-conversations.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappDeleteConversationsCommand)
export class WhatsappDeleteConversationsCommandHandler
  implements ICommandHandler<WhatsappDeleteConversationsCommand>
{
  constructor(
    private readonly deleteConversationsService: WhatsappDeleteConversationsService,
  ) {}

  async execute(command: WhatsappDeleteConversationsCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteConversationsService.main(
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
