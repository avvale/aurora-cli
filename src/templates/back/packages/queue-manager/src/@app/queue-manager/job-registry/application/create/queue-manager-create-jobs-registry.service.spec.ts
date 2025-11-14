/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    QueueManagerIJobRegistryRepository,
    QueueManagerMockJobRegistryRepository,
} from '@app/queue-manager/job-registry';
import { QueueManagerCreateJobsRegistryService } from '@app/queue-manager/job-registry/application/create/queue-manager-create-jobs-registry.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerCreateJobsRegistryService', () => {
    let service: QueueManagerCreateJobsRegistryService;
    let mockRepository: QueueManagerMockJobRegistryRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerCreateJobsRegistryService,
                QueueManagerMockJobRegistryRepository,
                {
                    provide: QueueManagerIJobRegistryRepository,
                    useValue: {
                        insert: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(QueueManagerCreateJobsRegistryService);
        mockRepository = module.get(QueueManagerMockJobRegistryRepository);
    });

    describe('main', () => {
        test('CreateJobsRegistryService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create jobsRegistry and emit event', async () => {
            expect(await service.main(mockRepository.collectionSource)).toBe(
                undefined,
            );
        });
    });
});
