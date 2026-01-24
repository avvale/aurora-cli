/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WhatsappIMessageRepository,
  whatsappMockMessageData,
  WhatsappMockMessageRepository,
} from '@app/whatsapp/message';
import { WhatsappUpdateAndIncrementMessagesService } from '@app/whatsapp/message/application/update/whatsapp-update-and-increment-messages.service';
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
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateAndIncrementMessagesService', () => {
  let service: WhatsappUpdateAndIncrementMessagesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappUpdateAndIncrementMessagesService,
        WhatsappMockMessageRepository,
        {
          provide: WhatsappIMessageRepository,
          useValue: {
            update: () => {
              /**/
            },
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappUpdateAndIncrementMessagesService);
  });

  describe('main', () => {
    test('UpdateAndIncrementMessagesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should update a messages and emit event', async () => {
      /* eslint-disable key-spacing */
      expect(
        await service.main(
          {
            id: new WhatsappMessageId(whatsappMockMessageData[0].id),
            wabaMessageId: new WhatsappMessageWabaMessageId(
              whatsappMockMessageData[0].wabaMessageId,
            ),
            timelineId: new WhatsappMessageTimelineId(
              whatsappMockMessageData[0].timelineId,
            ),
            conversationId: new WhatsappMessageConversationId(
              whatsappMockMessageData[0].conversationId,
            ),
            statuses: new WhatsappMessageStatuses(
              whatsappMockMessageData[0].statuses,
            ),
            direction: new WhatsappMessageDirection(
              whatsappMockMessageData[0].direction,
            ),
            accountId: new WhatsappMessageAccountId(
              whatsappMockMessageData[0].accountId,
            ),
            wabaContactId: new WhatsappMessageWabaContactId(
              whatsappMockMessageData[0].wabaContactId,
            ),
            contactName: new WhatsappMessageContactName(
              whatsappMockMessageData[0].contactName,
            ),
            type: new WhatsappMessageType(whatsappMockMessageData[0].type),
            payload: new WhatsappMessagePayload(
              whatsappMockMessageData[0].payload,
            ),
          },
          {},
          {},
        ),
      ).toBe(undefined);
      /* eslint-enable key-spacing */
    });
  });
});
