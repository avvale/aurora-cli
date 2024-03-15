/* eslint-disable key-spacing */
import { WhatsappUpsertConversationCommand } from '@app/whatsapp/conversation';
import { WhatsappUpsertConversationService } from '@app/whatsapp/conversation/application/upsert/whatsapp-upsert-conversation.service';
import {
    WhatsappConversationAccounts,
    WhatsappConversationId,
} from '@app/whatsapp/conversation/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappUpsertConversationCommand)
export class WhatsappUpsertConversationCommandHandler implements ICommandHandler<WhatsappUpsertConversationCommand>
{
    constructor(
        private readonly upsertConversationService: WhatsappUpsertConversationService,
    ) {}

    async execute(command: WhatsappUpsertConversationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertConversationService.main(
            {
                id: new WhatsappConversationId(command.payload.id),
                accounts: new WhatsappConversationAccounts(command.payload.accounts),
            },
            command.cQMetadata,
        );
    }
}
