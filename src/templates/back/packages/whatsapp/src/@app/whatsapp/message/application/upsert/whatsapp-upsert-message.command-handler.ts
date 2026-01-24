/* eslint-disable key-spacing */
import { WhatsappUpsertMessageCommand } from '@app/whatsapp/message';
import { WhatsappUpsertMessageService } from '@app/whatsapp/message/application/upsert/whatsapp-upsert-message.service';
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

@CommandHandler(WhatsappUpsertMessageCommand)
export class WhatsappUpsertMessageCommandHandler
  implements ICommandHandler<WhatsappUpsertMessageCommand>
{
  constructor(
    private readonly upsertMessageService: WhatsappUpsertMessageService,
  ) {}

  async execute(command: WhatsappUpsertMessageCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.upsertMessageService.main(
      {
        id: new WhatsappMessageId(command.payload.id),
        wabaMessageId: new WhatsappMessageWabaMessageId(
          command.payload.wabaMessageId,
        ),
        timelineId: new WhatsappMessageTimelineId(command.payload.timelineId),
        conversationId: new WhatsappMessageConversationId(
          command.payload.conversationId,
        ),
        statuses: new WhatsappMessageStatuses(command.payload.statuses),
        direction: new WhatsappMessageDirection(command.payload.direction),
        accountId: new WhatsappMessageAccountId(command.payload.accountId),
        wabaContactId: new WhatsappMessageWabaContactId(
          command.payload.wabaContactId,
        ),
        contactName: new WhatsappMessageContactName(
          command.payload.contactName,
        ),
        type: new WhatsappMessageType(command.payload.type),
        payload: new WhatsappMessagePayload(command.payload.payload),
      },
      command.cQMetadata,
    );
  }
}
