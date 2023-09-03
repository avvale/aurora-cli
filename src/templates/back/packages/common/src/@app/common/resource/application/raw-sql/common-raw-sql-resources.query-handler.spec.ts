import { CommonIResourceRepository, CommonMockResourceRepository, CommonRawSQLResourcesQuery, CommonResourceMapper } from '@app/common/resource';
import { CommonRawSQLResourcesQueryHandler } from '@app/common/resource/application/raw-sql/common-raw-sql-resources.query-handler';
import { CommonRawSQLResourcesService } from '@app/common/resource/application/raw-sql/common-raw-sql-resources.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLResourcesQueryHandler', () =>
{
    let queryHandler: CommonRawSQLResourcesQueryHandler;
    let service: CommonRawSQLResourcesService;
    let repository: CommonMockResourceRepository;
    let mapper: CommonResourceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonRawSQLResourcesQueryHandler,
                {
                    provide : CommonIResourceRepository,
                    useClass: CommonMockResourceRepository,
                },
                {
                    provide : CommonRawSQLResourcesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonRawSQLResourcesQueryHandler>(CommonRawSQLResourcesQueryHandler);
        service = module.get<CommonRawSQLResourcesService>(CommonRawSQLResourcesService);
        repository = <CommonMockResourceRepository>module.get<CommonIResourceRepository>(CommonIResourceRepository);
        mapper = new CommonResourceMapper();
    });

    describe('main', () =>
    {
        test('CommonRawSQLResourcesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an resources founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new CommonRawSQLResourcesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
