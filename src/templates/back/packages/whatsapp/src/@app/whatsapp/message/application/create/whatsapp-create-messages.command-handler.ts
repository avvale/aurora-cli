/* eslint-disable key-spacing */
import { WhatsappCreateMessagesCommand } from '@app/whatsapp/message';
import { WhatsappCreateMessagesService } from '@app/whatsapp/message/application/create/whatsapp-create-messages.service';
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

@CommandHandler(WhatsappCreateMessagesCommand)
export class WhatsappCreateMessagesCommandHandler implements ICommandHandler<WhatsappCreateMessagesCommand>
{
    constructor(
        private readonly createMessagesService: WhatsappCreateMessagesService,
    ) {}

    async execute(command: WhatsappCreateMessagesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createMessagesService.main(
            command.payload
                .map(message =>
                {
                    return {
                        id: new WhatsappMessageId(message.id),
                        whatsappMessageId: new WhatsappMessageWhatsappMessageId(message.whatsappMessageId),
                        conversationId: new WhatsappMessageConversationId(message.conversationId),
                        direction: new WhatsappMessageDirection(message.direction),
                        accountId: new WhatsappMessageAccountId(message.accountId),
                        displayPhoneNumber: new WhatsappMessageDisplayPhoneNumber(message.displayPhoneNumber),
                        phoneNumberId: new WhatsappMessagePhoneNumberId(message.phoneNumberId),
                        type: new WhatsappMessageType(message.type),
                        payload: new WhatsappMessagePayload(message.payload),
                    };
                }),
            command.cQMetadata,
        );
    }
}
