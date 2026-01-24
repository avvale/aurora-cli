/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  QueueManagerGetQueuesHandler,
  QueueManagerGetQueuesResolver,
} from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerGetQueuesResolver', () => {
  let resolver: QueueManagerGetQueuesResolver;
  let handler: QueueManagerGetQueuesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        QueueManagerGetQueuesResolver,
        {
          provide: QueueManagerGetQueuesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<QueueManagerGetQueuesResolver>(
      QueueManagerGetQueuesResolver,
    );
    handler = module.get<QueueManagerGetQueuesHandler>(
      QueueManagerGetQueuesHandler,
    );
  });

  test('QueueManagerGetQueuesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('QueueManagerGetQueuesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a queueManagerMockQueueData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(queueManagerMockQueueData)),
        );
      expect(await resolver.main()).toBe(queueManagerMockQueueData);
    });
  });
});
