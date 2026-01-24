/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerUpdateQueuesInput } from '@api/graphql';
import {
  QueueManagerUpdateQueuesHandler,
  QueueManagerUpdateQueuesResolver,
} from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateQueuesResolver', () => {
  let resolver: QueueManagerUpdateQueuesResolver;
  let handler: QueueManagerUpdateQueuesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        QueueManagerUpdateQueuesResolver,
        {
          provide: QueueManagerUpdateQueuesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<QueueManagerUpdateQueuesResolver>(
      QueueManagerUpdateQueuesResolver,
    );
    handler = module.get<QueueManagerUpdateQueuesHandler>(
      QueueManagerUpdateQueuesHandler,
    );
  });

  test('QueueManagerUpdateQueuesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('QueueManagerUpdateQueuesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a queues updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(queueManagerMockQueueData[0])),
        );
      expect(
        await resolver.main(
          <QueueManagerUpdateQueuesInput>queueManagerMockQueueData[0],
        ),
      ).toBe(queueManagerMockQueueData[0]);
    });
  });
});
