import {
  QueueManagerFindJobRegistryByIdController,
  QueueManagerFindJobRegistryByIdHandler,
} from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerFindJobRegistryByIdController', () => {
  let controller: QueueManagerFindJobRegistryByIdController;
  let handler: QueueManagerFindJobRegistryByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [QueueManagerFindJobRegistryByIdController],
      providers: [
        {
          provide: QueueManagerFindJobRegistryByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<QueueManagerFindJobRegistryByIdController>(
      QueueManagerFindJobRegistryByIdController,
    );
    handler = module.get<QueueManagerFindJobRegistryByIdHandler>(
      QueueManagerFindJobRegistryByIdHandler,
    );
  });

  describe('main', () => {
    test('QueueManagerFindJobRegistryByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an jobRegistry by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(queueManagerMockJobRegistryData[0]),
            ),
        );
      expect(await controller.main(queueManagerMockJobRegistryData[0].id)).toBe(
        queueManagerMockJobRegistryData[0],
      );
    });
  });
});
