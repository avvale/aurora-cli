import {
  QueueManagerCreateJobRegistryCommand,
  queueManagerMockJobRegistryData,
} from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';
import { QueueManagerCreateJobRegistryCommandHandler } from './queue-manager-create-job-registry.command-handler';
import { QueueManagerCreateJobRegistryService } from './queue-manager-create-job-registry.service';

describe('QueueManagerCreateJobRegistryCommandHandler', () => {
  let commandHandler: QueueManagerCreateJobRegistryCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueManagerCreateJobRegistryCommandHandler,
        {
          provide: QueueManagerCreateJobRegistryService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<QueueManagerCreateJobRegistryCommandHandler>(
      QueueManagerCreateJobRegistryCommandHandler,
    );
  });

  describe('main', () => {
    test('CreateJobRegistryCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the values objects and pass them as parameters to the QueueManagerCreateJobRegistryService', async () => {
      expect(
        await commandHandler.execute(
          new QueueManagerCreateJobRegistryCommand(
            {
              id: queueManagerMockJobRegistryData[0].id,
              rowId: queueManagerMockJobRegistryData[0].rowId,
              queueName: queueManagerMockJobRegistryData[0].queueName,
              state: queueManagerMockJobRegistryData[0].state,
              jobId: queueManagerMockJobRegistryData[0].jobId,
              jobName: queueManagerMockJobRegistryData[0].jobName,
              tags: queueManagerMockJobRegistryData[0].tags,
            },
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
