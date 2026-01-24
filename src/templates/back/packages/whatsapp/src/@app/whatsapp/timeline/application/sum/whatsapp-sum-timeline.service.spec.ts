import {
  WhatsappITimelineRepository,
  WhatsappMockTimelineRepository,
} from '@app/whatsapp/timeline';
import { WhatsappSumTimelineService } from '@app/whatsapp/timeline/application/sum/whatsapp-sum-timeline.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappSumTimelineService', () => {
  let service: WhatsappSumTimelineService;
  let repository: WhatsappITimelineRepository;
  let mockRepository: WhatsappMockTimelineRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappSumTimelineService,
        WhatsappMockTimelineRepository,
        {
          provide: WhatsappITimelineRepository,
          useValue: {
            sum: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappSumTimelineService);
    repository = module.get(WhatsappITimelineRepository);
    mockRepository = module.get(WhatsappMockTimelineRepository);
  });

  describe('main', () => {
    test('WhatsappSumTimelineService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should sum inboxes', async () => {
      jest
        .spyOn(repository, 'sum')
        .mockImplementation(
          (column: string) =>
            new Promise((resolve) => resolve(mockRepository.sum(column))),
        );
      expect(await service.main('id')).toBe(mockRepository.sum('id'));
    });
  });
});
