import {
  WhatsappITimelineRepository,
  WhatsappMockTimelineRepository,
} from '@app/whatsapp/timeline';
import { WhatsappCountTimelineService } from '@app/whatsapp/timeline/application/count/whatsapp-count-timeline.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCountTimelineService', () => {
  let service: WhatsappCountTimelineService;
  let repository: WhatsappITimelineRepository;
  let mockRepository: WhatsappMockTimelineRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappCountTimelineService,
        WhatsappMockTimelineRepository,
        {
          provide: WhatsappITimelineRepository,
          useValue: {
            count: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappCountTimelineService);
    repository = module.get(WhatsappITimelineRepository);
    mockRepository = module.get(WhatsappMockTimelineRepository);
  });

  describe('main', () => {
    test('WhatsappCountTimelineService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should count inboxes', async () => {
      jest
        .spyOn(repository, 'count')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource.length),
            ),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource.length);
    });
  });
});
