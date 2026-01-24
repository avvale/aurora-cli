import {
  WhatsappMessage,
  whatsappMockMessageData,
} from '@app/whatsapp/message';
import {
  WhatsappMessageAccountId,
  WhatsappMessageContactName,
  WhatsappMessageConversationId,
  WhatsappMessageCreatedAt,
  WhatsappMessageDeletedAt,
  WhatsappMessageDirection,
  WhatsappMessageId,
  WhatsappMessagePayload,
  WhatsappMessageStatuses,
  WhatsappMessageTimelineId,
  WhatsappMessageType,
  WhatsappMessageUpdatedAt,
  WhatsappMessageWabaContactId,
  WhatsappMessageWabaMessageId,
} from '@app/whatsapp/message/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class WhatsappMockMessageSeeder extends MockSeeder<WhatsappMessage> {
  public collectionSource: WhatsappMessage[];

  constructor() {
    super();
    this._createMock();
  }

  private _createMock(): void {
    this.collectionSource = [];

    for (const message of _.orderBy(whatsappMockMessageData, ['id'])) {
      this.collectionSource.push(
        WhatsappMessage.register(
          new WhatsappMessageId(message.id),
          new WhatsappMessageWabaMessageId(message.wabaMessageId),
          new WhatsappMessageTimelineId(message.timelineId),
          new WhatsappMessageConversationId(message.conversationId),
          new WhatsappMessageStatuses(message.statuses),
          new WhatsappMessageDirection(message.direction),
          new WhatsappMessageAccountId(message.accountId),
          new WhatsappMessageWabaContactId(message.wabaContactId),
          new WhatsappMessageContactName(message.contactName),
          new WhatsappMessageType(message.type),
          new WhatsappMessagePayload(message.payload),
          new WhatsappMessageCreatedAt({ currentTimestamp: true }),
          new WhatsappMessageUpdatedAt({ currentTimestamp: true }),
          new WhatsappMessageDeletedAt(null),
        ),
      );
    }
  }
}
