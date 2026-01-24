import {
  QueueManagerIJobRegistryRepository,
  queueManagerMockJobRegistryData,
  QueueManagerMockJobRegistryRepository,
} from '@app/queue-manager/job-registry';
import { QueueManagerFindJobRegistryByIdService } from '@app/queue-manager/job-registry/application/find/queue-manager-find-job-registry-by-id.service';
import { QueueManagerJobRegistryId } from '@app/queue-manager/job-registry/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerFindJobRegistryByIdService', () => {
  let service: QueueManagerFindJobRegistryByIdService;
  let repository: QueueManagerIJobRegistryRepository;
  let mockRepository: QueueManagerMockJobRegistryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        QueueManagerFindJobRegistryByIdService,
        QueueManagerMockJobRegistryRepository,
        {
          provide: QueueManagerIJobRegistryRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(QueueManagerFindJobRegistryByIdService);
    repository = module.get(QueueManagerIJobRegistryRepository);
    mockRepository = module.get(QueueManagerMockJobRegistryRepository);
  });

  describe('main', () => {
    test('FindJobRegistryByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find jobRegistry by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(
          new QueueManagerJobRegistryId(queueManagerMockJobRegistryData[0].id),
        ),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});
