import { QueueManagerCreateJobsRegistryHandler } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerCreateJobsRegistryHandler', () => {
  let handler: QueueManagerCreateJobsRegistryHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueManagerCreateJobsRegistryHandler,
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<QueueManagerCreateJobsRegistryHandler>(
      QueueManagerCreateJobsRegistryHandler,
    );
  });

  describe('main', () => {
    test('QueueManagerCreateJobsRegistryHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an queueManagerMockJobRegistryData created', async () => {
      expect(await handler.main(queueManagerMockJobRegistryData)).toBe(true);
    });
  });
});
