import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { QueueManagerRawSQLJobsRegistryService } from './queue-manager-raw-sql-jobs-registry.service';
import { QueueManagerIJobRegistryRepository } from '../../domain/queue-manager-job-registry.repository';
import { QueueManagerMockJobRegistryRepository } from '../../infrastructure/mock/queue-manager-mock-job-registry.repository';

describe('QueueManagerRawSQLJobsRegistryService ', () =>
{
    let service: QueueManagerRawSQLJobsRegistryService ;
    let repository: QueueManagerIJobRegistryRepository;
    let mockRepository: QueueManagerMockJobRegistryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerRawSQLJobsRegistryService ,
                QueueManagerMockJobRegistryRepository,
                {
                    provide : QueueManagerIJobRegistryRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(QueueManagerRawSQLJobsRegistryService );
        repository      = module.get(QueueManagerIJobRegistryRepository);
        mockRepository  = module.get(QueueManagerMockJobRegistryRepository);
    });

    describe('main', () =>
    {
        test('RawSQLJobsRegistryService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get jobsRegistry', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
