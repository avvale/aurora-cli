import { CommonIResourceRepository, CommonMockResourceRepository, CommonPaginateResourcesQuery } from '@app/common/resource';
import { CommonPaginateResourcesQueryHandler } from '@app/common/resource/application/paginate/common-paginate-resources.query-handler';
import { CommonPaginateResourcesService } from '@app/common/resource/application/paginate/common-paginate-resources.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateResourcesQueryHandler', () =>
{
    let queryHandler: CommonPaginateResourcesQueryHandler;
    let service: CommonPaginateResourcesService;
    let repository: CommonMockResourceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonPaginateResourcesQueryHandler,
                {
                    provide : CommonIResourceRepository,
                    useClass: CommonMockResourceRepository,
                },
                {
                    provide : CommonPaginateResourcesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<CommonPaginateResourcesQueryHandler>(CommonPaginateResourcesQueryHandler);
        service = module.get<CommonPaginateResourcesService>(CommonPaginateResourcesService);
        repository = <CommonMockResourceRepository>module.get<CommonIResourceRepository>(CommonIResourceRepository);
    });

    describe('main', () =>
    {
        test('CommonPaginateResourcesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an resources paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new CommonPaginateResourcesQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
