/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  QueueManagerIQueueRepository,
  queueManagerMockQueueData,
  QueueManagerMockQueueRepository,
} from '@app/queue-manager/queue';
import { QueueManagerUpdateQueuesService } from '@app/queue-manager/queue/application/update/queue-manager-update-queues.service';
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

describe('QueueManagerUpdateQueuesService', () => {
  let service: QueueManagerUpdateQueuesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        QueueManagerUpdateQueuesService,
        QueueManagerMockQueueRepository,
        {
          provide: QueueManagerIQueueRepository,
          useValue: {
            update: () => {
              /**/
            },
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(QueueManagerUpdateQueuesService);
  });

  describe('main', () => {
    test('UpdateQueuesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should update a queues and emit event', async () => {
      expect(
        await service.main(
          {
            id: new QueueManagerQueueId(queueManagerMockQueueData[0].id),
            rowId: new QueueManagerQueueRowId(
              queueManagerMockQueueData[0].rowId,
            ),
            prefix: new QueueManagerQueuePrefix(
              queueManagerMockQueueData[0].prefix,
            ),
            name: new QueueManagerQueueName(queueManagerMockQueueData[0].name),
          },
          {},
          {},
        ),
      ).toBe(undefined);
    });
  });
});
