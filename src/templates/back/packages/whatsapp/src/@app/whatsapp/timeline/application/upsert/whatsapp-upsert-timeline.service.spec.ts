/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WhatsappITimelineRepository,
  whatsappMockTimelineData,
  WhatsappMockTimelineRepository,
} from '@app/whatsapp/timeline';
import { WhatsappUpsertTimelineService } from '@app/whatsapp/timeline/application/upsert/whatsapp-upsert-timeline.service';
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

describe('WhatsappUpsertTimelineService', () => {
  let service: WhatsappUpsertTimelineService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappUpsertTimelineService,
        WhatsappMockTimelineRepository,
        {
          provide: WhatsappITimelineRepository,
          useValue: {
            upsert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappUpsertTimelineService);
  });

  describe('main', () => {
    test('WhatsappUpsertTimelineService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should upsert a timeline and emit event', async () => {
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
