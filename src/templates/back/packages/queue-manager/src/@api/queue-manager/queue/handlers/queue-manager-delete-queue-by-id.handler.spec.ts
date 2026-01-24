/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerDeleteQueueByIdHandler } from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteQueueByIdController', () => {
  let handler: QueueManagerDeleteQueueByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        QueueManagerDeleteQueueByIdHandler,
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

    handler = module.get<QueueManagerDeleteQueueByIdHandler>(
      QueueManagerDeleteQueueByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('QueueManagerDeleteQueueByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an queue deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(queueManagerMockQueueData[0])),
        );
      expect(
        await handler.main(
          queueManagerMockQueueData[0].id,
          {},
          'Europe/Madrid',
        ),
      ).toBe(queueManagerMockQueueData[0]);
    });
  });
});
