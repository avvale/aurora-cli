import {
  QueueManagerIQueueRepository,
  QueueManagerMockQueueRepository,
} from '@app/queue-manager/queue';
import { QueueManagerPaginateQueuesService } from '@app/queue-manager/queue/application/paginate/queue-manager-paginate-queues.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerPaginateQueuesService', () => {
  let service: QueueManagerPaginateQueuesService;
  let repository: QueueManagerIQueueRepository;
  let mockRepository: QueueManagerMockQueueRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        QueueManagerPaginateQueuesService,
        QueueManagerMockQueueRepository,
        {
          provide: QueueManagerIQueueRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(QueueManagerPaginateQueuesService);
    repository = module.get(QueueManagerIQueueRepository);
    mockRepository = module.get(QueueManagerMockQueueRepository);
  });

  describe('main', () => {
    test('QueueManagerPaginateQueuesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate queues', async () => {
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
