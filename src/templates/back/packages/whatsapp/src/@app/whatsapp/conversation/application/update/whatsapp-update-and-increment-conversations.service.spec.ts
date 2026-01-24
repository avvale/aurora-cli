/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WhatsappIConversationRepository,
  whatsappMockConversationData,
  WhatsappMockConversationRepository,
} from '@app/whatsapp/conversation';
import { WhatsappUpdateAndIncrementConversationsService } from '@app/whatsapp/conversation/application/update/whatsapp-update-and-increment-conversations.service';
import {
  WhatsappConversationCategory,
  WhatsappConversationExpiration,
  WhatsappConversationId,
  WhatsappConversationIsBillable,
  WhatsappConversationPricingModel,
  WhatsappConversationTimelineId,
  WhatsappConversationWabaContactId,
  WhatsappConversationWabaConversationId,
} from '@app/whatsapp/conversation/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateAndIncrementConversationsService', () => {
  let service: WhatsappUpdateAndIncrementConversationsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappUpdateAndIncrementConversationsService,
        WhatsappMockConversationRepository,
        {
          provide: WhatsappIConversationRepository,
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

    service = module.get(WhatsappUpdateAndIncrementConversationsService);
  });

  describe('main', () => {
    test('UpdateAndIncrementConversationsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should update a conversations and emit event', async () => {
      /* eslint-disable key-spacing */
      expect(
        await service.main(
          {
            id: new WhatsappConversationId(whatsappMockConversationData[0].id),
            wabaConversationId: new WhatsappConversationWabaConversationId(
              whatsappMockConversationData[0].wabaConversationId,
            ),
            timelineId: new WhatsappConversationTimelineId(
              whatsappMockConversationData[0].timelineId,
            ),
            wabaContactId: new WhatsappConversationWabaContactId(
              whatsappMockConversationData[0].wabaContactId,
            ),
            expiration: new WhatsappConversationExpiration(
              whatsappMockConversationData[0].expiration,
            ),
            category: new WhatsappConversationCategory(
              whatsappMockConversationData[0].category,
            ),
            isBillable: new WhatsappConversationIsBillable(
              whatsappMockConversationData[0].isBillable,
            ),
            pricingModel: new WhatsappConversationPricingModel(
              whatsappMockConversationData[0].pricingModel,
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
