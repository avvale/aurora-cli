/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerUpdateQueuesInput } from '@api/graphql';
import { QueueManagerUpdateQueuesHandler } from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateQueuesHandler', () => {
  let handler: QueueManagerUpdateQueuesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        QueueManagerUpdateQueuesHandler,
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

    handler = module.get<QueueManagerUpdateQueuesHandler>(
      QueueManagerUpdateQueuesHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('QueueManagerUpdateQueuesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('QueueManagerUpdateQueuesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a queues updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(queueManagerMockQueueData[0])),
        );
      expect(
        await handler.main(
          <QueueManagerUpdateQueuesInput>queueManagerMockQueueData[0],
          {},
          {},
          'Europe/Madrid',
        ),
      ).toBe(queueManagerMockQueueData[0]);
    });
  });
});
