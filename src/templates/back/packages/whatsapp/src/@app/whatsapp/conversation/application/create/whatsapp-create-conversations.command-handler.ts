/* eslint-disable key-spacing */
import { WhatsappCreateConversationsCommand } from '@app/whatsapp/conversation';
import { WhatsappCreateConversationsService } from '@app/whatsapp/conversation/application/create/whatsapp-create-conversations.service';
import {
    WhatsappConversationAccounts,
    WhatsappConversationId,
} from '@app/whatsapp/conversation/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappCreateConversationsCommand)
export class WhatsappCreateConversationsCommandHandler implements ICommandHandler<WhatsappCreateConversationsCommand>
{
    constructor(
        private readonly createConversationsService: WhatsappCreateConversationsService,
    ) {}

    async execute(command: WhatsappCreateConversationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createConversationsService.main(
            command.payload
                .map(conversation =>
                {
                    return {
                        id: new WhatsappConversationId(conversation.id),
                        accounts: new WhatsappConversationAccounts(conversation.accounts),
                    };
                }),
            command.cQMetadata,
        );
    }
}
