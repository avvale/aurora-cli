import { WhatsappDeleteConversationByIdCommand } from '@app/whatsapp/conversation';
import { WhatsappDeleteConversationByIdService } from '@app/whatsapp/conversation/application/delete/whatsapp-delete-conversation-by-id.service';
import { WhatsappConversationId } from '@app/whatsapp/conversation/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappDeleteConversationByIdCommand)
export class WhatsappDeleteConversationByIdCommandHandler implements ICommandHandler<WhatsappDeleteConversationByIdCommand>
{
    constructor(
        private readonly deleteConversationByIdService: WhatsappDeleteConversationByIdService,
    ) {}

    async execute(command: WhatsappDeleteConversationByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteConversationByIdService.main(
            new WhatsappConversationId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
