/* eslint-disable key-spacing */
import { WhatsappCreateMessageCommand } from '@app/whatsapp/message';
import { WhatsappCreateMessageService } from '@app/whatsapp/message/application/create/whatsapp-create-message.service';
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

@CommandHandler(WhatsappCreateMessageCommand)
export class WhatsappCreateMessageCommandHandler implements ICommandHandler<WhatsappCreateMessageCommand>
{
    constructor(
        private readonly createMessageService: WhatsappCreateMessageService,
    ) {}

    async execute(command: WhatsappCreateMessageCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createMessageService.main(
            {
                id: new WhatsappMessageId(command.payload.id),
                whatsappMessageId: new WhatsappMessageWhatsappMessageId(command.payload.whatsappMessageId),
                conversationId: new WhatsappMessageConversationId(command.payload.conversationId),
                direction: new WhatsappMessageDirection(command.payload.direction),
                accountId: new WhatsappMessageAccountId(command.payload.accountId),
                displayPhoneNumber: new WhatsappMessageDisplayPhoneNumber(command.payload.displayPhoneNumber),
                phoneNumberId: new WhatsappMessagePhoneNumberId(command.payload.phoneNumberId),
                type: new WhatsappMessageType(command.payload.type),
                payload: new WhatsappMessagePayload(command.payload.payload),
            },
            command.cQMetadata,
        );
    }
}
