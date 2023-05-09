import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetJobsRegistryService } from './get-jobs-registry.service';
import { IJobRegistryRepository } from '../../domain/job-registry.repository';
import { MockJobRegistryRepository } from '../../infrastructure/mock/mock-job-registry.repository';

describe('GetJobsRegistryService', () =>
{
    let service: GetJobsRegistryService;
    let repository: IJobRegistryRepository;
    let mockRepository: MockJobRegistryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetJobsRegistryService,
                MockJobRegistryRepository,
                {
                    provide : IJobRegistryRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(GetJobsRegistryService);
        repository = module.get(IJobRegistryRepository);
        mockRepository = module.get(MockJobRegistryRepository);
    });

    describe('main', () =>
    {
        test('GetJobsRegistryService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get jobsRegistry', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});