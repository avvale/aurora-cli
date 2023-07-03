import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindLangByIdQueryHandler } from './common-find-lang-by-id.query-handler';
import { CommonMockLangRepository } from '@app/common/lang/infrastructure/mock/common-mock-lang.repository';
import { commonMockLangData } from '@app/common/lang/infrastructure/mock/common-mock-lang.data';
import { CommonILangRepository } from '@app/common/lang/domain/common-lang.repository';
import { CommonLangMapper } from '@app/common/lang/domain/common-lang.mapper';
import { CommonFindLangByIdQuery } from './common-find-lang-by-id.query';
import { CommonFindLangByIdService } from './common-find-lang-by-id.service';

describe('CommonFindLangByIdQueryHandler', () =>
{
    let queryHandler: CommonFindLangByIdQueryHandler;
    let service: CommonFindLangByIdService;
    let repository: CommonMockLangRepository;
    let mapper: CommonLangMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonFindLangByIdQueryHandler,
                {
                    provide : CommonILangRepository,
                    useClass: CommonMockLangRepository,
                },
                {
                    provide : CommonFindLangByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonFindLangByIdQueryHandler>(CommonFindLangByIdQueryHandler);
        service = module.get<CommonFindLangByIdService>(CommonFindLangByIdService);
        repository = <CommonMockLangRepository>module.get<CommonILangRepository>(CommonILangRepository);
        mapper = new CommonLangMapper();
    });

    describe('main', () =>
    {
        test('FindLangByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an lang founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new CommonFindLangByIdQuery(
                    commonMockLangData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});