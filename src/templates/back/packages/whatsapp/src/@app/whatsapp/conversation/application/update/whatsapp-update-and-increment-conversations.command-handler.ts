/* eslint-disable key-spacing */
import { WhatsappUpdateAndIncrementConversationsCommand } from '@app/whatsapp/conversation';
import { WhatsappUpdateAndIncrementConversationsService } from '@app/whatsapp/conversation/application/update/whatsapp-update-and-increment-conversations.service';
import {
    WhatsappConversationAccounts,
    WhatsappConversationId,
} from '@app/whatsapp/conversation/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappUpdateAndIncrementConversationsCommand)
export class WhatsappUpdateAndIncrementConversationsCommandHandler implements ICommandHandler<WhatsappUpdateAndIncrementConversationsCommand>
{
    constructor(
        private readonly updateConversationsService: WhatsappUpdateAndIncrementConversationsService,
    ) {}

    async execute(command: WhatsappUpdateAndIncrementConversationsCommand): Promise<void>
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
