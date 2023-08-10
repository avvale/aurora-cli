/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry/infrastructure/mock/queue-manager-mock-job-registry.data';
import { QueueManagerUpdateJobRegistryByIdService } from './queue-manager-update-job-registry-by-id.service';
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

describe('QueueManagerUpdateJobRegistryByIdService', () =>
{
    let service: QueueManagerUpdateJobRegistryByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerUpdateJobRegistryByIdService,
                QueueManagerMockJobRegistryRepository,
                {
                    provide : QueueManagerIJobRegistryRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(QueueManagerUpdateJobRegistryByIdService);
    });

    describe('main', () =>
    {
        test('QueueManagerUpdateJobRegistryByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a jobRegistry and emit event', async () =>
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
                ),
            ).toBe(undefined);
        });
    });
});
