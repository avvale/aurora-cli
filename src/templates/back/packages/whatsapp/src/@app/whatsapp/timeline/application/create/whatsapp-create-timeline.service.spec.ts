/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WhatsappITimelineRepository,
  whatsappMockTimelineData,
  WhatsappMockTimelineRepository,
} from '@app/whatsapp/timeline';
import { WhatsappCreateTimelineService } from '@app/whatsapp/timeline/application/create/whatsapp-create-timeline.service';
import {
  WhatsappTimelineAccounts,
  WhatsappTimelineId,
  WhatsappTimelineWabaContactId,
  WhatsappTimelineWabaPhoneNumberId,
} from '@app/whatsapp/timeline/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCreateTimelineService', () => {
  let service: WhatsappCreateTimelineService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappCreateTimelineService,
        WhatsappMockTimelineRepository,
        {
          provide: WhatsappITimelineRepository,
          useValue: {
            create: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappCreateTimelineService);
  });

  describe('main', () => {
    test('WhatsappCreateTimelineService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create a timeline and emit event', async () => {
      expect(
        await service.main({
          id: new WhatsappTimelineId(whatsappMockTimelineData[0].id),
          accounts: new WhatsappTimelineAccounts(
            whatsappMockTimelineData[0].accounts,
          ),
          wabaPhoneNumberId: new WhatsappTimelineWabaPhoneNumberId(
            whatsappMockTimelineData[0].wabaPhoneNumberId,
          ),
          wabaContactId: new WhatsappTimelineWabaContactId(
            whatsappMockTimelineData[0].wabaContactId,
          ),
        }),
      ).toBe(undefined);
    });
  });
});
