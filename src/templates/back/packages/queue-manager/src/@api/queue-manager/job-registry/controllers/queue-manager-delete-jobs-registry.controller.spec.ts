import {
  QueueManagerDeleteJobsRegistryController,
  QueueManagerDeleteJobsRegistryHandler,
} from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteJobsRegistryController', () => {
  let controller: QueueManagerDeleteJobsRegistryController;
  let handler: QueueManagerDeleteJobsRegistryHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [QueueManagerDeleteJobsRegistryController],
      providers: [
        {
          provide: QueueManagerDeleteJobsRegistryHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<QueueManagerDeleteJobsRegistryController>(
      QueueManagerDeleteJobsRegistryController,
    );
    handler = module.get<QueueManagerDeleteJobsRegistryHandler>(
      QueueManagerDeleteJobsRegistryHandler,
    );
  });

  describe('main', () => {
    test('QueueManagerDeleteJobsRegistryController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an queueManagerMockJobRegistryData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(queueManagerMockJobRegistryData)),
        );
      expect(await controller.main()).toBe(queueManagerMockJobRegistryData);
    });
  });
});
