import {
  QueueManagerIJobRegistryRepository,
  QueueManagerMockJobRegistryRepository,
} from '@app/queue-manager/job-registry';
import { QueueManagerGetJobsRegistryService } from '@app/queue-manager/job-registry/application/get/queue-manager-get-jobs-registry.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerGetJobsRegistryService', () => {
  let service: QueueManagerGetJobsRegistryService;
  let repository: QueueManagerIJobRegistryRepository;
  let mockRepository: QueueManagerMockJobRegistryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        QueueManagerGetJobsRegistryService,
        QueueManagerMockJobRegistryRepository,
        {
          provide: QueueManagerIJobRegistryRepository,
          useValue: {
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(QueueManagerGetJobsRegistryService);
    repository = module.get(QueueManagerIJobRegistryRepository);
    mockRepository = module.get(QueueManagerMockJobRegistryRepository);
  });

  describe('main', () => {
    test('GetJobsRegistryService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get jobsRegistry', async () => {
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
