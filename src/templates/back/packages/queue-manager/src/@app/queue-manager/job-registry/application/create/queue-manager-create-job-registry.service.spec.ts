/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  QueueManagerIJobRegistryRepository,
  queueManagerMockJobRegistryData,
  QueueManagerMockJobRegistryRepository,
} from '@app/queue-manager/job-registry';
import { QueueManagerCreateJobRegistryService } from '@app/queue-manager/job-registry/application/create/queue-manager-create-job-registry.service';
import {
  QueueManagerJobRegistryId,
  QueueManagerJobRegistryJobId,
  QueueManagerJobRegistryJobName,
  QueueManagerJobRegistryQueueName,
  QueueManagerJobRegistryRowId,
  QueueManagerJobRegistryState,
  QueueManagerJobRegistryTags,
} from '@app/queue-manager/job-registry/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerCreateJobRegistryService', () => {
  let service: QueueManagerCreateJobRegistryService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        QueueManagerCreateJobRegistryService,
        QueueManagerMockJobRegistryRepository,
        {
          provide: QueueManagerIJobRegistryRepository,
          useValue: {
            create: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(QueueManagerCreateJobRegistryService);
  });

  describe('main', () => {
    test('QueueManagerCreateJobRegistryService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create a jobRegistry and emit event', async () => {
      expect(
        await service.main({
          id: new QueueManagerJobRegistryId(
            queueManagerMockJobRegistryData[0].id,
          ),
          rowId: new QueueManagerJobRegistryRowId(
            queueManagerMockJobRegistryData[0].rowId,
          ),
          queueName: new QueueManagerJobRegistryQueueName(
            queueManagerMockJobRegistryData[0].queueName,
          ),
          state: new QueueManagerJobRegistryState(
            queueManagerMockJobRegistryData[0].state,
          ),
          jobId: new QueueManagerJobRegistryJobId(
            queueManagerMockJobRegistryData[0].jobId,
          ),
          jobName: new QueueManagerJobRegistryJobName(
            queueManagerMockJobRegistryData[0].jobName,
          ),
          tags: new QueueManagerJobRegistryTags(
            queueManagerMockJobRegistryData[0].tags,
          ),
        }),
      ).toBe(undefined);
    });
  });
});
