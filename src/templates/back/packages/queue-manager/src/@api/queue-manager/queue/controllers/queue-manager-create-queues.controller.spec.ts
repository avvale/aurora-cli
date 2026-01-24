import {
  QueueManagerCreateQueuesController,
  QueueManagerCreateQueuesHandler,
} from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerCreateQueuesController', () => {
  let controller: QueueManagerCreateQueuesController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueueManagerCreateQueuesController],
      providers: [
        {
          provide: QueueManagerCreateQueuesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<QueueManagerCreateQueuesController>(
      QueueManagerCreateQueuesController,
    );
  });

  describe('main', () => {
    test('QueueManagerCreateQueuesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an queueManagerMockQueueData created', async () => {
      expect(await controller.main(queueManagerMockQueueData)).toBe(undefined);
    });
  });
});
