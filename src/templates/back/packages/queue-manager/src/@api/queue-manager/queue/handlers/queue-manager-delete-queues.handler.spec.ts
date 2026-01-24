/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerDeleteQueuesHandler } from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteQueuesHandler', () => {
  let handler: QueueManagerDeleteQueuesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        QueueManagerDeleteQueuesHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<QueueManagerDeleteQueuesHandler>(
      QueueManagerDeleteQueuesHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('QueueManagerDeleteQueuesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('QueueManagerDeleteQueuesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an queueManagerMockQueueData deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(queueManagerMockQueueData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        queueManagerMockQueueData,
      );
    });
  });
});
