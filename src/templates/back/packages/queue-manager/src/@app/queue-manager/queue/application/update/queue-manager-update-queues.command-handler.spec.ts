import {
  queueManagerMockQueueData,
  QueueManagerUpdateQueuesCommand,
} from '@app/queue-manager/queue';
import { QueueManagerUpdateQueuesCommandHandler } from '@app/queue-manager/queue/application/update/queue-manager-update-queues.command-handler';
import { QueueManagerUpdateQueuesService } from '@app/queue-manager/queue/application/update/queue-manager-update-queues.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateQueuesCommandHandler', () => {
  let commandHandler: QueueManagerUpdateQueuesCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueManagerUpdateQueuesCommandHandler,
        {
          provide: QueueManagerUpdateQueuesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<QueueManagerUpdateQueuesCommandHandler>(
      QueueManagerUpdateQueuesCommandHandler,
    );
  });

  describe('main', () => {
    test('UpdateQueuesCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an queues updated', async () => {
      expect(
        await commandHandler.execute(
          new QueueManagerUpdateQueuesCommand(
            {
              id: queueManagerMockQueueData[0].id,
              rowId: queueManagerMockQueueData[0].rowId,
              prefix: queueManagerMockQueueData[0].prefix,
              name: queueManagerMockQueueData[0].name,
            },
            {},
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
