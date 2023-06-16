import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { MockLangRepository } from '@app/common/lang/infrastructure/mock/mock-lang.repository';
import { CommonILangRepository } from '@app/common/lang/domain/common-lang.repository';
import { CommonLangMapper } from '@app/common/lang/domain/common-lang.mapper';
import { RawSQLLangsQueryHandler } from './raw-sql-langs.query-handler';
import { RawSQLLangsQuery } from './raw-sql-langs.query';
import { RawSQLLangsService } from './raw-sql-langs.service';

describe('RawSQLLangsQueryHandler', () =>
{
    let queryHandler: RawSQLLangsQueryHandler;
    let service: RawSQLLangsService;
    let repository: MockLangRepository;
    let mapper: LangMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RawSQLLangsQueryHandler,
                {
                    provide : CommonILangRepository,
                    useClass: MockLangRepository,
                },
                {
                    provide : RawSQLLangsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<RawSQLLangsQueryHandler>(RawSQLLangsQueryHandler);
        service = module.get<RawSQLLangsService>(RawSQLLangsService);
        repository = <MockLangRepository>module.get<CommonILangRepository>(CommonILangRepository);
        mapper = new LangMapper();
    });

    describe('main', () =>
    {
        test('RawSQLLangsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an langs founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new RawSQLLangsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});