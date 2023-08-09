import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { CommonFindResourceService } from './common-find-resource.service';
import { CommonIResourceRepository } from '../../domain/common-resource.repository';
import { CommonMockResourceRepository } from '../../infrastructure/mock/common-mock-resource.repository';

describe('CommonFindResourceService', () =>
{
    let service: CommonFindResourceService;
    let repository: CommonIResourceRepository;
    let mockRepository: CommonMockResourceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonFindResourceService,
                CommonMockResourceRepository,
                {
                    provide : CommonIResourceRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonFindResourceService);
        repository = module.get(CommonIResourceRepository);
        mockRepository = module.get(CommonMockResourceRepository);
    });

    describe('main', () =>
    {
        test('CommonFindResourceService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find resource', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
