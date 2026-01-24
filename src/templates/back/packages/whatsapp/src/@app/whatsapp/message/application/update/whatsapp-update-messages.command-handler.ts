/* eslint-disable key-spacing */
import { WhatsappUpdateMessagesCommand } from '@app/whatsapp/message';
import { WhatsappUpdateMessagesService } from '@app/whatsapp/message/application/update/whatsapp-update-messages.service';
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

@CommandHandler(WhatsappUpdateMessagesCommand)
export class WhatsappUpdateMessagesCommandHandler
  implements ICommandHandler<WhatsappUpdateMessagesCommand>
{
  constructor(
    private readonly updateMessagesService: WhatsappUpdateMessagesService,
  ) {}

  async execute(command: WhatsappUpdateMessagesCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateMessagesService.main(
      {
        id: new WhatsappMessageId(command.payload.id, { undefinable: true }),
        wabaMessageId: new WhatsappMessageWabaMessageId(
          command.payload.wabaMessageId,
          { undefinable: true },
        ),
        timelineId: new WhatsappMessageTimelineId(command.payload.timelineId, {
          undefinable: true,
        }),
        conversationId: new WhatsappMessageConversationId(
          command.payload.conversationId,
        ),
        statuses: new WhatsappMessageStatuses(command.payload.statuses, {
          undefinable: true,
        }),
        direction: new WhatsappMessageDirection(command.payload.direction, {
          undefinable: true,
        }),
        accountId: new WhatsappMessageAccountId(command.payload.accountId),
        wabaContactId: new WhatsappMessageWabaContactId(
          command.payload.wabaContactId,
          { undefinable: true },
        ),
        contactName: new WhatsappMessageContactName(
          command.payload.contactName,
        ),
        type: new WhatsappMessageType(command.payload.type, {
          undefinable: true,
        }),
        payload: new WhatsappMessagePayload(command.payload.payload, {
          undefinable: true,
        }),
      },
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
