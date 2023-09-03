import { CommonILangRepository, CommonMockLangRepository } from '@app/common/lang';
import { CommonRawSQLLangsService } from '@app/common/lang/application/raw-sql/common-raw-sql-langs.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonRawSQLLangsService ', () =>
{
    let service: CommonRawSQLLangsService ;
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
                CommonRawSQLLangsService ,
                CommonMockLangRepository,
                {
                    provide : CommonILangRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(CommonRawSQLLangsService );
        repository      = module.get(CommonILangRepository);
        mockRepository  = module.get(CommonMockLangRepository);
    });

    describe('main', () =>
    {
        test('RawSQLLangsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get langs', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
