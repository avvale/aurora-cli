/* eslint-disable key-spacing */
import { WhatsappUpsertMessageCommand } from '@app/whatsapp/message';
import { WhatsappUpsertMessageService } from '@app/whatsapp/message/application/upsert/whatsapp-upsert-message.service';
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

@CommandHandler(WhatsappUpsertMessageCommand)
export class WhatsappUpsertMessageCommandHandler implements ICommandHandler<WhatsappUpsertMessageCommand>
{
    constructor(
        private readonly upsertMessageService: WhatsappUpsertMessageService,
    ) {}

    async execute(command: WhatsappUpsertMessageCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertMessageService.main(
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
