/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WhatsappITimelineRepository,
  whatsappMockTimelineData,
  WhatsappMockTimelineRepository,
} from '@app/whatsapp/timeline';
import { WhatsappUpdateAndIncrementTimelinesService } from '@app/whatsapp/timeline/application/update/whatsapp-update-and-increment-timelines.service';
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

describe('WhatsappUpdateAndIncrementTimelinesService', () => {
  let service: WhatsappUpdateAndIncrementTimelinesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappUpdateAndIncrementTimelinesService,
        WhatsappMockTimelineRepository,
        {
          provide: WhatsappITimelineRepository,
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

    service = module.get(WhatsappUpdateAndIncrementTimelinesService);
  });

  describe('main', () => {
    test('UpdateAndIncrementTimelinesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should update a timelines and emit event', async () => {
      /* eslint-disable key-spacing */
      expect(
        await service.main(
          {
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
          },
          {},
          {},
        ),
      ).toBe(undefined);
      /* eslint-enable key-spacing */
    });
  });
});
