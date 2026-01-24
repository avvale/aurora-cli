/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerCreateQueueHandler } from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerCreateQueueHandler', () => {
  let handler: QueueManagerCreateQueueHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        QueueManagerCreateQueueHandler,
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

    handler = module.get<QueueManagerCreateQueueHandler>(
      QueueManagerCreateQueueHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('QueueManagerCreateQueueHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an queue created', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(queueManagerMockQueueData[0])),
        );
      expect(
        await handler.main(queueManagerMockQueueData[0], 'Europe/Madrid'),
      ).toBe(queueManagerMockQueueData[0]);
    });
  });
});
