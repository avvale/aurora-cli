/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  QueueManagerPaginateJobsRegistryHandler,
  QueueManagerPaginateJobsRegistryResolver,
} from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerPaginateJobsRegistryResolver', () => {
  let resolver: QueueManagerPaginateJobsRegistryResolver;
  let handler: QueueManagerPaginateJobsRegistryHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        QueueManagerPaginateJobsRegistryResolver,
        {
          provide: QueueManagerPaginateJobsRegistryHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<QueueManagerPaginateJobsRegistryResolver>(
      QueueManagerPaginateJobsRegistryResolver,
    );
    handler = module.get<QueueManagerPaginateJobsRegistryHandler>(
      QueueManagerPaginateJobsRegistryHandler,
    );
  });

  test('QueueManagerPaginateJobsRegistryResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('QueueManagerPaginateJobsRegistryResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a queueManagerMockJobRegistryData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: queueManagerMockJobRegistryData,
            }),
          ),
      );
      expect(await resolver.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: queueManagerMockJobRegistryData,
      });
    });
  });
});
