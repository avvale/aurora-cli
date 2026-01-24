import {
  QueueManagerUpdateQueueByIdController,
  QueueManagerUpdateQueueByIdHandler,
} from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateQueueByIdController', () => {
  let controller: QueueManagerUpdateQueueByIdController;
  let handler: QueueManagerUpdateQueueByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [QueueManagerUpdateQueueByIdController],
      providers: [
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

    controller = module.get<QueueManagerUpdateQueueByIdController>(
      QueueManagerUpdateQueueByIdController,
    );
    handler = module.get<QueueManagerUpdateQueueByIdHandler>(
      QueueManagerUpdateQueueByIdHandler,
    );
  });

  describe('main', () => {
    test('QueueManagerUpdateQueueByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a queue updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(queueManagerMockQueueData[0])),
        );
      expect(await controller.main(queueManagerMockQueueData[0])).toBe(
        queueManagerMockQueueData[0],
      );
    });
  });
});
