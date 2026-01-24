/* eslint-disable key-spacing */
import { WhatsappCreateMessagesCommand } from '@app/whatsapp/message';
import { WhatsappCreateMessagesService } from '@app/whatsapp/message/application/create/whatsapp-create-messages.service';
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

@CommandHandler(WhatsappCreateMessagesCommand)
export class WhatsappCreateMessagesCommandHandler
  implements ICommandHandler<WhatsappCreateMessagesCommand>
{
  constructor(
    private readonly createMessagesService: WhatsappCreateMessagesService,
  ) {}

  async execute(command: WhatsappCreateMessagesCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createMessagesService.main(
      command.payload.map((message) => {
        return {
          id: new WhatsappMessageId(message.id),
          wabaMessageId: new WhatsappMessageWabaMessageId(
            message.wabaMessageId,
          ),
          timelineId: new WhatsappMessageTimelineId(message.timelineId),
          conversationId: new WhatsappMessageConversationId(
            message.conversationId,
          ),
          statuses: new WhatsappMessageStatuses(message.statuses),
          direction: new WhatsappMessageDirection(message.direction),
          accountId: new WhatsappMessageAccountId(message.accountId),
          wabaContactId: new WhatsappMessageWabaContactId(
            message.wabaContactId,
          ),
          contactName: new WhatsappMessageContactName(message.contactName),
          type: new WhatsappMessageType(message.type),
          payload: new WhatsappMessagePayload(message.payload),
        };
      }),
      command.cQMetadata,
    );
  }
}
