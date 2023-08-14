import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { CommonPaginateLangsService } from './common-paginate-langs.service';
import { CommonILangRepository } from '../../domain/common-lang.repository';
import { CommonMockLangRepository } from '../../infrastructure/mock/common-mock-lang.repository';

describe('CommonPaginateLangsService', () =>
{
    let service: CommonPaginateLangsService;
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
                CommonPaginateLangsService,
                CommonMockLangRepository,
                {
                    provide : CommonILangRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonPaginateLangsService);
        repository = module.get(CommonILangRepository);
        mockRepository = module.get(CommonMockLangRepository);
    });

    describe('main', () =>
    {
        test('CommonPaginateLangsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate langs', async () =>
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            })));
            expect(await service.main({
                offset: 0,
                limit : 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            });
        });
    });
});
