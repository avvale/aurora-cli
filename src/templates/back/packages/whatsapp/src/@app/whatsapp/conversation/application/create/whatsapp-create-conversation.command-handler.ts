/* eslint-disable key-spacing */
import { WhatsappCreateConversationCommand } from '@app/whatsapp/conversation';
import { WhatsappCreateConversationService } from '@app/whatsapp/conversation/application/create/whatsapp-create-conversation.service';
import {
    WhatsappConversationAccounts,
    WhatsappConversationId,
} from '@app/whatsapp/conversation/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappCreateConversationCommand)
export class WhatsappCreateConversationCommandHandler implements ICommandHandler<WhatsappCreateConversationCommand>
{
    constructor(
        private readonly createConversationService: WhatsappCreateConversationService,
    ) {}

    async execute(command: WhatsappCreateConversationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createConversationService.main(
            {
                id: new WhatsappConversationId(command.payload.id),
                accounts: new WhatsappConversationAccounts(command.payload.accounts),
            },
            command.cQMetadata,
        );
    }
}
