/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { QueueManagerCreateJobsRegistryService } from './queue-manager-create-jobs-registry.service';
import { QueueManagerIJobRegistryRepository } from '../../domain/queue-manager-job-registry.repository';
import { QueueManagerMockJobRegistryRepository } from '../../infrastructure/mock/queue-manager-mock-job-registry.repository';

describe('QueueManagerCreateJobsRegistryService', () =>
{
    let service: QueueManagerCreateJobsRegistryService;
    let mockRepository: QueueManagerMockJobRegistryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerCreateJobsRegistryService,
                QueueManagerMockJobRegistryRepository,
                {
                    provide : QueueManagerIJobRegistryRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(QueueManagerCreateJobsRegistryService);
        mockRepository = module.get(QueueManagerMockJobRegistryRepository);
    });

    describe('main', () =>
    {
        test('CreateJobsRegistryService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create jobsRegistry and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});
