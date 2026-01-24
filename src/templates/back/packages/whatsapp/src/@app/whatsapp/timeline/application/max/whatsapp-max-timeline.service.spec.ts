import {
  WhatsappITimelineRepository,
  WhatsappMockTimelineRepository,
} from '@app/whatsapp/timeline';
import { WhatsappMaxTimelineService } from '@app/whatsapp/timeline/application/max/whatsapp-max-timeline.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappMaxTimelineService', () => {
  let service: WhatsappMaxTimelineService;
  let repository: WhatsappITimelineRepository;
  let mockRepository: WhatsappMockTimelineRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappMaxTimelineService,
        WhatsappMockTimelineRepository,
        {
          provide: WhatsappITimelineRepository,
          useValue: {
            max: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappMaxTimelineService);
    repository = module.get(WhatsappITimelineRepository);
    mockRepository = module.get(WhatsappMockTimelineRepository);
  });

  describe('main', () => {
    test('WhatsappMaxTimelineService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should max inboxes', async () => {
      jest
        .spyOn(repository, 'max')
        .mockImplementation(
          (column: string) =>
            new Promise((resolve) => resolve(mockRepository.max(column))),
        );
      expect(await service.main('id')).toBe(mockRepository.max('id'));
    });
  });
});
