import {
  WhatsappITimelineRepository,
  WhatsappMockTimelineRepository,
} from '@app/whatsapp/timeline';
import { WhatsappPaginateTimelinesService } from '@app/whatsapp/timeline/application/paginate/whatsapp-paginate-timelines.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappPaginateTimelinesService', () => {
  let service: WhatsappPaginateTimelinesService;
  let repository: WhatsappITimelineRepository;
  let mockRepository: WhatsappMockTimelineRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappPaginateTimelinesService,
        WhatsappMockTimelineRepository,
        {
          provide: WhatsappITimelineRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappPaginateTimelinesService);
    repository = module.get(WhatsappITimelineRepository);
    mockRepository = module.get(WhatsappMockTimelineRepository);
  });

  describe('main', () => {
    test('WhatsappPaginateTimelinesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate timelines', async () => {
      jest.spyOn(repository, 'paginate').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: mockRepository.collectionSource.slice(0, 10).length,
              count: mockRepository.collectionSource.slice(0, 10).length,
              rows: mockRepository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await service.main({
          offset: 0,
          limit: 10,
        }),
      ).toStrictEqual({
        total: mockRepository.collectionSource.slice(0, 10).length,
        count: mockRepository.collectionSource.slice(0, 10).length,
        rows: mockRepository.collectionSource.slice(0, 10),
      });
    });
  });
});
