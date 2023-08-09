import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonMockResourceRepository } from '@app/common/resource/infrastructure/mock/common-mock-resource.repository';
import { CommonIResourceRepository } from '@app/common/resource/domain/common-resource.repository';
import { CommonResourceMapper } from '@app/common/resource/domain/common-resource.mapper';
import { CommonRawSQLResourcesQueryHandler } from './common-raw-sql-resources.query-handler';
import { CommonRawSQLResourcesQuery } from './common-raw-sql-resources.query';
import { CommonRawSQLResourcesService } from './common-raw-sql-resources.service';

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
