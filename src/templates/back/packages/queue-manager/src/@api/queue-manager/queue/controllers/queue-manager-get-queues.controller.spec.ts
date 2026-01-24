import {
  QueueManagerGetQueuesController,
  QueueManagerGetQueuesHandler,
} from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerGetQueuesController', () => {
  let controller: QueueManagerGetQueuesController;
  let handler: QueueManagerGetQueuesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [QueueManagerGetQueuesController],
      providers: [
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

    controller = module.get<QueueManagerGetQueuesController>(
      QueueManagerGetQueuesController,
    );
    handler = module.get<QueueManagerGetQueuesHandler>(
      QueueManagerGetQueuesHandler,
    );
  });

  describe('main', () => {
    test('QueueManagerGetQueuesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a queueManagerMockQueueData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(queueManagerMockQueueData)),
        );
      expect(await controller.main()).toBe(queueManagerMockQueueData);
    });
  });
});
