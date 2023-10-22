import { QueueManagerIJobRegistryRepository, QueueManagerMockJobRegistryRepository } from '@app/queue-manager/job-registry';
import { QueueManagerRawSQLJobsRegistryService } from '@app/queue-manager/job-registry/application/raw-sql/queue-manager-raw-sql-jobs-registry.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

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
