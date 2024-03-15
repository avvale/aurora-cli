/* eslint-disable key-spacing */
import { WhatsappUpdateAndIncrementMessagesCommand } from '@app/whatsapp/message';
import { WhatsappUpdateAndIncrementMessagesService } from '@app/whatsapp/message/application/update/whatsapp-update-and-increment-messages.service';
import {
    WhatsappMessageAccountId,
    WhatsappMessageConversationId,
    WhatsappMessageDirection,
    WhatsappMessageDisplayPhoneNumber,
    WhatsappMessageId,
    WhatsappMessagePayload,
    WhatsappMessagePhoneNumberId,
    WhatsappMessageType,
    WhatsappMessageWhatsappMessageId,
} from '@app/whatsapp/message/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(WhatsappUpdateAndIncrementMessagesCommand)
export class WhatsappUpdateAndIncrementMessagesCommandHandler implements ICommandHandler<WhatsappUpdateAndIncrementMessagesCommand>
{
    constructor(
        private readonly updateMessagesService: WhatsappUpdateAndIncrementMessagesService,
    ) {}

    async execute(command: WhatsappUpdateAndIncrementMessagesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateMessagesService.main(
            {
                id: new WhatsappMessageId(command.payload.id, { undefinable: true }),
                whatsappMessageId: new WhatsappMessageWhatsappMessageId(command.payload.whatsappMessageId, { undefinable: true }),
                conversationId: new WhatsappMessageConversationId(command.payload.conversationId, { undefinable: true }),
                direction: new WhatsappMessageDirection(command.payload.direction, { undefinable: true }),
                accountId: new WhatsappMessageAccountId(command.payload.accountId),
                displayPhoneNumber: new WhatsappMessageDisplayPhoneNumber(command.payload.displayPhoneNumber, { undefinable: true }),
                phoneNumberId: new WhatsappMessagePhoneNumberId(command.payload.phoneNumberId, { undefinable: true }),
                type: new WhatsappMessageType(command.payload.type, { undefinable: true }),
                payload: new WhatsappMessagePayload(command.payload.payload, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
