/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerPaginateQueuesHandler } from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerPaginateQueuesHandler', () => {
  let handler: QueueManagerPaginateQueuesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        QueueManagerPaginateQueuesHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<QueueManagerPaginateQueuesHandler>(
      QueueManagerPaginateQueuesHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('QueueManagerPaginateQueuesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('QueueManagerPaginateQueuesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a queues', async () => {
      jest.spyOn(queryBus, 'ask').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: queueManagerMockQueueData.length,
              count: queueManagerMockQueueData.length,
              rows: queueManagerMockQueueData,
            }),
          ),
      );
      expect(await handler.main({}, {})).toEqual({
        total: queueManagerMockQueueData.length,
        count: queueManagerMockQueueData.length,
        rows: queueManagerMockQueueData,
      });
    });
  });
});
