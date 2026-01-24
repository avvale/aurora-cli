/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerUpdateJobRegistryByIdInput } from '@api/graphql';
import { QueueManagerUpdateJobRegistryByIdHandler } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateJobRegistryByIdHandler', () => {
  let handler: QueueManagerUpdateJobRegistryByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        QueueManagerUpdateJobRegistryByIdHandler,
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

    handler = module.get<QueueManagerUpdateJobRegistryByIdHandler>(
      QueueManagerUpdateJobRegistryByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('QueueManagerUpdateJobRegistryByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('QueueManagerUpdateJobRegistryByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a jobRegistry updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(queueManagerMockJobRegistryData[0]),
            ),
        );
      expect(
        await handler.main(
          <QueueManagerUpdateJobRegistryByIdInput>(
            queueManagerMockJobRegistryData[0]
          ),
          {},
          'Europe/Madrid',
        ),
      ).toBe(queueManagerMockJobRegistryData[0]);
    });
  });
});
