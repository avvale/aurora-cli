import {
  QueueManagerCreateJobRegistryController,
  QueueManagerCreateJobRegistryHandler,
} from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerCreateJobRegistryController', () => {
  let controller: QueueManagerCreateJobRegistryController;
  let handler: QueueManagerCreateJobRegistryHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [QueueManagerCreateJobRegistryController],
      providers: [
        {
          provide: QueueManagerCreateJobRegistryHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<QueueManagerCreateJobRegistryController>(
      QueueManagerCreateJobRegistryController,
    );
    handler = module.get<QueueManagerCreateJobRegistryHandler>(
      QueueManagerCreateJobRegistryHandler,
    );
  });

  describe('main', () => {
    test('QueueManagerCreateJobRegistryController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an jobRegistry created', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(queueManagerMockJobRegistryData[0]),
            ),
        );
      expect(await controller.main(queueManagerMockJobRegistryData[0])).toBe(
        queueManagerMockJobRegistryData[0],
      );
    });
  });
});
