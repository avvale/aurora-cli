import { CommonILangRepository, CommonMockLangRepository } from '@app/common/lang';
import { CommonFindLangService } from '@app/common/lang/application/find/common-find-lang.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindLangService', () =>
{
    let service: CommonFindLangService;
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
                CommonFindLangService,
                CommonMockLangRepository,
                {
                    provide : CommonILangRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonFindLangService);
        repository = module.get(CommonILangRepository);
        mockRepository = module.get(CommonMockLangRepository);
    });

    describe('main', () =>
    {
        test('CommonFindLangService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find lang', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
