/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';
import { CreateJobRegistryService } from './create-job-registry.service';
import {
    JobRegistryId,
    JobRegistryQueueName,
    JobRegistryJobId,
    JobRegistryJobName,
    JobRegistryTags,
    JobRegistryCreatedAt,
    JobRegistryUpdatedAt,
    JobRegistryDeletedAt,
} from '../../domain/value-objects';
import { IJobRegistryRepository } from '../../domain/job-registry.repository';
import { MockJobRegistryRepository } from '../../infrastructure/mock/mock-job-registry.repository';

describe('CreateJobRegistryService', () =>

{
    let service: CreateJobRegistryService;
    let repository: IJobRegistryRepository;
    let mockRepository: MockJobRegistryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateJobRegistryService,
                MockJobRegistryRepository,
                {
                    provide : IJobRegistryRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CreateJobRegistryService);
        repository = module.get(IJobRegistryRepository);
        mockRepository = module.get(MockJobRegistryRepository);
    });

    describe('main', () =>
    {
        test('CreateJobRegistryService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a jobRegistry and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new JobRegistryId(jobsRegistry[0].id),
                    queueName: new JobRegistryQueueName(jobsRegistry[0].queueName),
                    jobId: new JobRegistryJobId(jobsRegistry[0].jobId),
                    jobName: new JobRegistryJobName(jobsRegistry[0].jobName),
                    tags: new JobRegistryTags(jobsRegistry[0].tags),
                },
            )).toBe(undefined);
        });
    });
});