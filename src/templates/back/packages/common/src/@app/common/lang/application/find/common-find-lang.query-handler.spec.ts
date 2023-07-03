import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindLangQueryHandler } from './common-find-lang.query-handler';
import { CommonMockLangRepository } from '@app/common/lang/infrastructure/mock/common-mock-lang.repository';
import { CommonILangRepository } from '@app/common/lang/domain/common-lang.repository';
import { CommonLangMapper } from '@app/common/lang/domain/common-lang.mapper';
import { CommonFindLangQuery } from './common-find-lang.query';
import { CommonFindLangService } from './common-find-lang.service';

describe('CommonFindLangQueryHandler', () =>
{
    let queryHandler: CommonFindLangQueryHandler;
    let service: CommonFindLangService;
    let repository: CommonMockLangRepository;
    let mapper: CommonLangMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonFindLangQueryHandler,
                {
                    provide : CommonILangRepository,
                    useClass: CommonMockLangRepository,
                },
                {
                    provide : CommonFindLangService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonFindLangQueryHandler>(CommonFindLangQueryHandler);
        service = module.get<CommonFindLangService>(CommonFindLangService);
        repository = <CommonMockLangRepository>module.get<CommonILangRepository>(CommonILangRepository);
        mapper = new CommonLangMapper();
    });

    describe('main', () =>
    {
        test('CommonFindLangQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an lang founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new CommonFindLangQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});