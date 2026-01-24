/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  QueueManagerIQueueRepository,
  queueManagerMockQueueData,
  QueueManagerMockQueueRepository,
} from '@app/queue-manager/queue';
import { QueueManagerDeleteQueueByIdService } from '@app/queue-manager/queue/application/delete/queue-manager-delete-queue-by-id.service';
import { QueueManagerQueueId } from '@app/queue-manager/queue/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteQueueByIdService', () => {
  let service: QueueManagerDeleteQueueByIdService;
  let repository: QueueManagerIQueueRepository;
  let mockRepository: QueueManagerMockQueueRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        QueueManagerDeleteQueueByIdService,
        QueueManagerMockQueueRepository,
        {
          provide: QueueManagerIQueueRepository,
          useValue: {
            deleteById: (id) => {
              /**/
            },
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(QueueManagerDeleteQueueByIdService);
    repository = module.get(QueueManagerIQueueRepository);
    mockRepository = module.get(QueueManagerMockQueueRepository);
  });

  describe('main', () => {
    test('QueueManagerDeleteQueueByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete queue and emit event', async () => {
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
          new QueueManagerQueueId(queueManagerMockQueueData[0].id),
          {},
        ),
      ).toBe(undefined);
    });
  });
});
