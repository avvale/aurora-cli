import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { RawSQLJobsRegistryService } from './raw-sql-jobs-registry.service';
import { IJobRegistryRepository } from '../../domain/job-registry.repository';
import { MockJobRegistryRepository } from '../../infrastructure/mock/mock-job-registry.repository';

describe('RawSQLJobsRegistryService', () =>
{
    let service: RawSQLJobsRegistryService;
    let repository: IJobRegistryRepository;
    let mockRepository: MockJobRegistryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                RawSQLJobsRegistryService,
                MockJobRegistryRepository,
                {
                    provide : IJobRegistryRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(RawSQLJobsRegistryService);
        repository      = module.get(IJobRegistryRepository);
        mockRepository  = module.get(MockJobRegistryRepository);
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