/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerUpdateJobsRegistryInput } from '@api/graphql';
import {
  QueueManagerUpdateJobsRegistryHandler,
  QueueManagerUpdateJobsRegistryResolver,
} from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateJobsRegistryResolver', () => {
  let resolver: QueueManagerUpdateJobsRegistryResolver;
  let handler: QueueManagerUpdateJobsRegistryHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        QueueManagerUpdateJobsRegistryResolver,
        {
          provide: QueueManagerUpdateJobsRegistryHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<QueueManagerUpdateJobsRegistryResolver>(
      QueueManagerUpdateJobsRegistryResolver,
    );
    handler = module.get<QueueManagerUpdateJobsRegistryHandler>(
      QueueManagerUpdateJobsRegistryHandler,
    );
  });

  test('QueueManagerUpdateJobsRegistryResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('QueueManagerUpdateJobsRegistryResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a jobsRegistry updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(queueManagerMockJobRegistryData[0]),
            ),
        );
      expect(
        await resolver.main(
          <QueueManagerUpdateJobsRegistryInput>(
            queueManagerMockJobRegistryData[0]
          ),
        ),
      ).toBe(queueManagerMockJobRegistryData[0]);
    });
  });
});
