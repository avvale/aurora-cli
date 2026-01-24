/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WhatsappITimelineRepository,
  WhatsappMockTimelineRepository,
} from '@app/whatsapp/timeline';
import { WhatsappCreateTimelinesService } from '@app/whatsapp/timeline/application/create/whatsapp-create-timelines.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCreateTimelinesService', () => {
  let service: WhatsappCreateTimelinesService;
  let mockRepository: WhatsappMockTimelineRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappCreateTimelinesService,
        WhatsappMockTimelineRepository,
        {
          provide: WhatsappITimelineRepository,
          useValue: {
            insert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappCreateTimelinesService);
    mockRepository = module.get(WhatsappMockTimelineRepository);
  });

  describe('main', () => {
    test('CreateTimelinesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create timelines and emit event', async () => {
      expect(await service.main(mockRepository.collectionSource)).toBe(
        undefined,
      );
    });
  });
});
