import { CommonILangRepository, CommonLangMapper, CommonMockLangRepository, CommonRawSQLLangsQuery } from '@app/common/lang';
import { CommonRawSQLLangsQueryHandler } from '@app/common/lang/application/raw-sql/common-raw-sql-langs.query-handler';
import { CommonRawSQLLangsService } from '@app/common/lang/application/raw-sql/common-raw-sql-langs.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLLangsQueryHandler', () =>
{
    let queryHandler: CommonRawSQLLangsQueryHandler;
    let service: CommonRawSQLLangsService;
    let repository: CommonMockLangRepository;
    let mapper: CommonLangMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonRawSQLLangsQueryHandler,
                {
                    provide : CommonILangRepository,
                    useClass: CommonMockLangRepository,
                },
                {
                    provide : CommonRawSQLLangsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonRawSQLLangsQueryHandler>(CommonRawSQLLangsQueryHandler);
        service = module.get<CommonRawSQLLangsService>(CommonRawSQLLangsService);
        repository = <CommonMockLangRepository>module.get<CommonILangRepository>(CommonILangRepository);
        mapper = new CommonLangMapper();
    });

    describe('main', () =>
    {
        test('CommonRawSQLLangsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an langs founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new CommonRawSQLLangsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
