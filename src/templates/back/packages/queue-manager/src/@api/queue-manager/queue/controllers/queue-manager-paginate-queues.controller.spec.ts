import {
  QueueManagerPaginateQueuesController,
  QueueManagerPaginateQueuesHandler,
} from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerPaginateQueuesController', () => {
  let controller: QueueManagerPaginateQueuesController;
  let handler: QueueManagerPaginateQueuesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [QueueManagerPaginateQueuesController],
      providers: [
        {
          provide: QueueManagerPaginateQueuesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<QueueManagerPaginateQueuesController>(
      QueueManagerPaginateQueuesController,
    );
    handler = module.get<QueueManagerPaginateQueuesHandler>(
      QueueManagerPaginateQueuesHandler,
    );
  });

  describe('main', () => {
    test('QueueManagerPaginateQueuesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a queueManagerMockQueueData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: queueManagerMockQueueData,
            }),
          ),
      );
      expect(await controller.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: queueManagerMockQueueData,
      });
    });
  });
});
