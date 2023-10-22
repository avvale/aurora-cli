/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerIJobRegistryRepository, queueManagerMockJobRegistryData, QueueManagerMockJobRegistryRepository } from '@app/queue-manager/job-registry';
import { QueueManagerUpdateJobsRegistryService } from '@app/queue-manager/job-registry/application/update/queue-manager-update-jobs-registry.service';
import {
    QueueManagerJobRegistryId,
    QueueManagerJobRegistryJobId,
    QueueManagerJobRegistryJobName,
    QueueManagerJobRegistryQueueName,
    QueueManagerJobRegistryState,
    QueueManagerJobRegistryTags,
} from '@app/queue-manager/job-registry/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateJobsRegistryService', () =>
{
    let service: QueueManagerUpdateJobsRegistryService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerUpdateJobsRegistryService,
                QueueManagerMockJobRegistryRepository,
                {
                    provide : QueueManagerIJobRegistryRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(QueueManagerUpdateJobsRegistryService);
    });

    describe('main', () =>
    {
        test('UpdateJobsRegistryService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a jobsRegistry and emit event', async () =>
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
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
