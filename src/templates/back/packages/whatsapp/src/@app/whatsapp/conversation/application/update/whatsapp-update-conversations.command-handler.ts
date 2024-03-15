/* eslint-disable key-spacing */
import { WhatsappUpdateConversationsCommand } from '@app/whatsapp/conversation';
import { WhatsappUpdateConversationsService } from '@app/whatsapp/conversation/application/update/whatsapp-update-conversations.service';
import {
    WhatsappConversationAccounts,
    WhatsappConversationId,
} from '@app/whatsapp/conversation/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappUpdateConversationsCommand)
export class WhatsappUpdateConversationsCommandHandler implements ICommandHandler<WhatsappUpdateConversationsCommand>
{
    constructor(
        private readonly updateConversationsService: WhatsappUpdateConversationsService,
    ) {}

    async execute(command: WhatsappUpdateConversationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateConversationsService.main(
            {
                id: new WhatsappConversationId(command.payload.id, { undefinable: true }),
                accounts: new WhatsappConversationAccounts(command.payload.accounts),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
