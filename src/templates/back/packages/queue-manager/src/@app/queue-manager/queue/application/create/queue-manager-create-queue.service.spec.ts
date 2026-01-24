/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  QueueManagerIQueueRepository,
  queueManagerMockQueueData,
  QueueManagerMockQueueRepository,
} from '@app/queue-manager/queue';
import { QueueManagerCreateQueueService } from '@app/queue-manager/queue/application/create/queue-manager-create-queue.service';
import {
  QueueManagerQueueId,
  QueueManagerQueueName,
  QueueManagerQueuePrefix,
  QueueManagerQueueRowId,
} from '@app/queue-manager/queue/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerCreateQueueService', () => {
  let service: QueueManagerCreateQueueService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        QueueManagerCreateQueueService,
        QueueManagerMockQueueRepository,
        {
          provide: QueueManagerIQueueRepository,
          useValue: {
            create: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(QueueManagerCreateQueueService);
  });

  describe('main', () => {
    test('QueueManagerCreateQueueService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create a queue and emit event', async () => {
      expect(
        await service.main({
          id: new QueueManagerQueueId(queueManagerMockQueueData[0].id),
          rowId: new QueueManagerQueueRowId(queueManagerMockQueueData[0].rowId),
          prefix: new QueueManagerQueuePrefix(
            queueManagerMockQueueData[0].prefix,
          ),
          name: new QueueManagerQueueName(queueManagerMockQueueData[0].name),
        }),
      ).toBe(undefined);
    });
  });
});
