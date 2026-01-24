import {
  QueueManagerIQueueRepository,
  QueueManagerMockQueueRepository,
} from '@app/queue-manager/queue';
import { QueueManagerGetQueuesService } from '@app/queue-manager/queue/application/get/queue-manager-get-queues.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerGetQueuesService', () => {
  let service: QueueManagerGetQueuesService;
  let repository: QueueManagerIQueueRepository;
  let mockRepository: QueueManagerMockQueueRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        QueueManagerGetQueuesService,
        QueueManagerMockQueueRepository,
        {
          provide: QueueManagerIQueueRepository,
          useValue: {
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(QueueManagerGetQueuesService);
    repository = module.get(QueueManagerIQueueRepository);
    mockRepository = module.get(QueueManagerMockQueueRepository);
  });

  describe('main', () => {
    test('GetQueuesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get queues', async () => {
      jest
        .spyOn(repository, 'get')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(mockRepository.collectionSource)),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource);
    });
  });
});
