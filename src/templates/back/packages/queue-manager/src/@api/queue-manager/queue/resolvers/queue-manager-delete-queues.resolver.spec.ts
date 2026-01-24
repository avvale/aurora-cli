/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  QueueManagerDeleteQueuesHandler,
  QueueManagerDeleteQueuesResolver,
} from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteQueuesResolver', () => {
  let resolver: QueueManagerDeleteQueuesResolver;
  let handler: QueueManagerDeleteQueuesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        QueueManagerDeleteQueuesResolver,
        {
          provide: QueueManagerDeleteQueuesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<QueueManagerDeleteQueuesResolver>(
      QueueManagerDeleteQueuesResolver,
    );
    handler = module.get<QueueManagerDeleteQueuesHandler>(
      QueueManagerDeleteQueuesHandler,
    );
  });

  test('QueueManagerDeleteQueuesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('QueueManagerDeleteQueuesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an queueManagerMockQueueData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(queueManagerMockQueueData)),
        );
      expect(await resolver.main()).toBe(queueManagerMockQueueData);
    });
  });
});
