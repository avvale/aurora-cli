import { CommonILangRepository, CommonMockLangRepository } from '@app/common/lang';
import { CommonGetLangsService } from '@app/common/lang/application/get/common-get-langs.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetLangsService', () =>
{
    let service: CommonGetLangsService;
    let repository: CommonILangRepository;
    let mockRepository: CommonMockLangRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonGetLangsService,
                CommonMockLangRepository,
                {
                    provide : CommonILangRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonGetLangsService);
        repository = module.get(CommonILangRepository);
        mockRepository = module.get(CommonMockLangRepository);
    });

    describe('main', () =>
    {
        test('GetLangsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get langs', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
