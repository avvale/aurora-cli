/* eslint-disable key-spacing */
import { WhatsappUpdateConversationByIdCommand } from '@app/whatsapp/conversation';
import { WhatsappUpdateConversationByIdService } from '@app/whatsapp/conversation/application/update/whatsapp-update-conversation-by-id.service';
import {
    WhatsappConversationAccounts,
    WhatsappConversationId,
} from '@app/whatsapp/conversation/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappUpdateConversationByIdCommand)
export class WhatsappUpdateConversationByIdCommandHandler implements ICommandHandler<WhatsappUpdateConversationByIdCommand>
{
    constructor(
        private readonly updateConversationByIdService: WhatsappUpdateConversationByIdService,
    ) {}

    async execute(command: WhatsappUpdateConversationByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateConversationByIdService.main(
            {
                id: new WhatsappConversationId(command.payload.id),
                accounts: new WhatsappConversationAccounts(command.payload.accounts),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
