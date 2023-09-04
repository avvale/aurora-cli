import { CommonIResourceRepository, CommonMockResourceRepository } from '@app/common/resource';
import { CommonGetResourcesService } from '@app/common/resource/application/get/common-get-resources.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetResourcesService', () =>
{
    let service: CommonGetResourcesService;
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
                CommonGetResourcesService,
                CommonMockResourceRepository,
                {
                    provide : CommonIResourceRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonGetResourcesService);
        repository = module.get(CommonIResourceRepository);
        mockRepository = module.get(CommonMockResourceRepository);
    });

    describe('main', () =>
    {
        test('GetResourcesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get resources', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
