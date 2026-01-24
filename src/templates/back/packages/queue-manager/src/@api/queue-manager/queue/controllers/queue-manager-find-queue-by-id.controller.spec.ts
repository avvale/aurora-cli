import {
  QueueManagerFindQueueByIdController,
  QueueManagerFindQueueByIdHandler,
} from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerFindQueueByIdController', () => {
  let controller: QueueManagerFindQueueByIdController;
  let handler: QueueManagerFindQueueByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [QueueManagerFindQueueByIdController],
      providers: [
        {
          provide: QueueManagerFindQueueByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<QueueManagerFindQueueByIdController>(
      QueueManagerFindQueueByIdController,
    );
    handler = module.get<QueueManagerFindQueueByIdHandler>(
      QueueManagerFindQueueByIdHandler,
    );
  });

  describe('main', () => {
    test('QueueManagerFindQueueByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an queue by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(queueManagerMockQueueData[0])),
        );
      expect(await controller.main(queueManagerMockQueueData[0].id)).toBe(
        queueManagerMockQueueData[0],
      );
    });
  });
});
