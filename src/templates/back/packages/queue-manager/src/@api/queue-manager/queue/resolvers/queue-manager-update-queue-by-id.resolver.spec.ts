/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerUpdateQueueByIdInput } from '@api/graphql';
import {
  QueueManagerUpdateQueueByIdHandler,
  QueueManagerUpdateQueueByIdResolver,
} from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateQueueByIdResolver', () => {
  let resolver: QueueManagerUpdateQueueByIdResolver;
  let handler: QueueManagerUpdateQueueByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        QueueManagerUpdateQueueByIdResolver,
        {
          provide: QueueManagerUpdateQueueByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<QueueManagerUpdateQueueByIdResolver>(
      QueueManagerUpdateQueueByIdResolver,
    );
    handler = module.get<QueueManagerUpdateQueueByIdHandler>(
      QueueManagerUpdateQueueByIdHandler,
    );
  });

  test('QueueManagerUpdateQueueByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('QueueManagerUpdateQueueByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a queue by id updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(queueManagerMockQueueData[0])),
        );
      expect(
        await resolver.main(
          <QueueManagerUpdateQueueByIdInput>queueManagerMockQueueData[0],
        ),
      ).toBe(queueManagerMockQueueData[0]);
    });
  });
});
