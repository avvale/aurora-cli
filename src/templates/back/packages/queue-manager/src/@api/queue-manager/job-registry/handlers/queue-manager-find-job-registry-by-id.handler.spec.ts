/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerFindJobRegistryByIdHandler } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerFindJobRegistryByIdHandler', () => {
  let handler: QueueManagerFindJobRegistryByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        QueueManagerFindJobRegistryByIdHandler,
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

    handler = module.get<QueueManagerFindJobRegistryByIdHandler>(
      QueueManagerFindJobRegistryByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('QueueManagerFindJobRegistryByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('QueueManagerFindJobRegistryByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an jobRegistry by id', async () => {
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
          queueManagerMockJobRegistryData[0].id,
          {},
          'Europe/Madrid',
        ),
      ).toBe(queueManagerMockJobRegistryData[0]);
    });
  });
});
