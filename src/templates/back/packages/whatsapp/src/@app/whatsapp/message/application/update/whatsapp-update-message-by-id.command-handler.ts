/* eslint-disable key-spacing */
import { WhatsappUpdateMessageByIdCommand } from '@app/whatsapp/message';
import { WhatsappUpdateMessageByIdService } from '@app/whatsapp/message/application/update/whatsapp-update-message-by-id.service';
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

@CommandHandler(WhatsappUpdateMessageByIdCommand)
export class WhatsappUpdateMessageByIdCommandHandler implements ICommandHandler<WhatsappUpdateMessageByIdCommand>
{
    constructor(
        private readonly updateMessageByIdService: WhatsappUpdateMessageByIdService,
    ) {}

    async execute(command: WhatsappUpdateMessageByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateMessageByIdService.main(
            {
                id: new WhatsappMessageId(command.payload.id),
                whatsappMessageId: new WhatsappMessageWhatsappMessageId(command.payload.whatsappMessageId, { undefinable: true }),
                conversationId: new WhatsappMessageConversationId(command.payload.conversationId, { undefinable: true }),
                direction: new WhatsappMessageDirection(command.payload.direction, { undefinable: true }),
                accountId: new WhatsappMessageAccountId(command.payload.accountId),
                displayPhoneNumber: new WhatsappMessageDisplayPhoneNumber(command.payload.displayPhoneNumber, { undefinable: true }),
                phoneNumberId: new WhatsappMessagePhoneNumberId(command.payload.phoneNumberId, { undefinable: true }),
                type: new WhatsappMessageType(command.payload.type, { undefinable: true }),
                payload: new WhatsappMessagePayload(command.payload.payload, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
