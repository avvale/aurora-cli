/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry/infrastructure/mock/queue-manager-mock-job-registry.data';
import { QueueManagerCreateJobRegistryService } from './queue-manager-create-job-registry.service';
import {
    QueueManagerJobRegistryId,
    QueueManagerJobRegistryQueueName,
    QueueManagerJobRegistryState,
    QueueManagerJobRegistryJobId,
    QueueManagerJobRegistryJobName,
    QueueManagerJobRegistryTags,
    QueueManagerJobRegistryCreatedAt,
    QueueManagerJobRegistryUpdatedAt,
    QueueManagerJobRegistryDeletedAt,
} from '../../domain/value-objects';
import { QueueManagerIJobRegistryRepository } from '../../domain/queue-manager-job-registry.repository';
import { QueueManagerMockJobRegistryRepository } from '../../infrastructure/mock/queue-manager-mock-job-registry.repository';

describe('QueueManagerCreateJobRegistryService', () =>

{
    let service: QueueManagerCreateJobRegistryService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerCreateJobRegistryService,
                QueueManagerMockJobRegistryRepository,
                {
                    provide : QueueManagerIJobRegistryRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(QueueManagerCreateJobRegistryService);
    });

    describe('main', () =>
    {
        test('QueueManagerCreateJobRegistryService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a jobRegistry and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new QueueManagerJobRegistryId(queueManagerMockJobRegistryData[0].id),
                        queueName: new QueueManagerJobRegistryQueueName(queueManagerMockJobRegistryData[0].queueName),
                        state: new QueueManagerJobRegistryState(queueManagerMockJobRegistryData[0].state),
                        jobId: new QueueManagerJobRegistryJobId(queueManagerMockJobRegistryData[0].jobId),
                        jobName: new QueueManagerJobRegistryJobName(queueManagerMockJobRegistryData[0].jobName),
                        tags: new QueueManagerJobRegistryTags(queueManagerMockJobRegistryData[0].tags),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
