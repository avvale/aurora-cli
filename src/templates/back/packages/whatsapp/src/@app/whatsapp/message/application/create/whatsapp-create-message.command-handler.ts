/* eslint-disable key-spacing */
import { WhatsappCreateMessageCommand } from '@app/whatsapp/message';
import { WhatsappCreateMessageService } from '@app/whatsapp/message/application/create/whatsapp-create-message.service';
import {
    WhatsappMessageAccountId,
    WhatsappMessageContactName,
    WhatsappMessageConversationId,
    WhatsappMessageDirection,
    WhatsappMessageId,
    WhatsappMessagePayload,
    WhatsappMessageStatuses,
    WhatsappMessageTimelineId,
    WhatsappMessageType,
    WhatsappMessageWabaContactId,
    WhatsappMessageWabaMessageId,
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
                wabaMessageId: new WhatsappMessageWabaMessageId(command.payload.wabaMessageId),
                timelineId: new WhatsappMessageTimelineId(command.payload.timelineId),
                conversationId: new WhatsappMessageConversationId(command.payload.conversationId),
                statuses: new WhatsappMessageStatuses(command.payload.statuses),
                direction: new WhatsappMessageDirection(command.payload.direction),
                accountId: new WhatsappMessageAccountId(command.payload.accountId),
                wabaContactId: new WhatsappMessageWabaContactId(command.payload.wabaContactId),
                contactName: new WhatsappMessageContactName(command.payload.contactName),
                type: new WhatsappMessageType(command.payload.type),
                payload: new WhatsappMessagePayload(command.payload.payload),
            },
            command.cQMetadata,
        );
    }
}
